// import supertest from "supertest";
// import { App } from "../../app";
// import { expect } from "chai";
// import { StatusCode } from "@panenco/papi";
// import { login } from "../../controllers/auth/handlers/login.handler";
// import { MikroORM } from "@mikro-orm/core";
// import { PostgreSqlDriver } from "@mikro-orm/postgresql";
// import { User } from "../../entities/user.entity";
// import { ProductAddBody, ProductGiftBody } from "../../contracts/product.body";
// import { UserBody, UserGiftBody } from "../../contracts/user.body";
// import { FridgeBody, FridgeGetBody } from "../../contracts/fridge.body";
// import { Product } from "../../entities/product.entity";
// import { Fridge } from "../../entities/fridge.entity";
// import { CreateFridgeView } from "../../contracts/fridge.view";
// import exp from "constants";
// const userFixtures: User[] = [
//     {
//         firstName: 'firstTest1',
//         lastName: 'lastTest1',
//         email: 'test-user+1@panenco.com',
//         password: 'Password1',
//     }    as User,
//     {
//         firstName: 'firstTest2',
//         lastName: 'lastTest2',
//         email: 'test-user+2@panenco.com',
//         password: 'Password2',
//     }   as User,
//     {
//         firstName: 'firstTest3',
//         lastName: 'lastTest3',
//         email: 'test-user+3@panenco.com',
//         password: 'Password3',
//       } as User,
//     ];
// const fridgeFixtures: Fridge[] = [
//     {
//         location: 1,
//         capacity: 5,
//     }   as Fridge,
//     {
//         location: 2,
//         capacity: 10,
//     }   as Fridge,
//     ];
// const productFixtures: Product[] = [
//     {
//         name: 'banana',
//         size: 3
//     }   as Product,
//     {
//         name: 'apple',
//         size: 2
//     }   as Product,
//     {
//         name: 'milk',
//         size: 5
//     }   as Product,
// ]
// describe('Integration User tests', () => {
//     let users: User[]
//     let fridges: Fridge[]
//     let productBodys: {}[] = []
//     let products: Product[]
//     let request: supertest.SuperTest<supertest.Test>;
//     let orm: MikroORM<PostgreSqlDriver>
//     before(async () => {
//     const app = new App();
//     await app.createConnection();
//     orm = app.orm;
//     request = supertest(app.host);
//     });
//     beforeEach(async () => {
//     await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
//     await orm.getMigrator().up();
//     const em = orm.em.fork();
//     users = userFixtures.map((x) => em.create(User, x));
//     await em.persistAndFlush(users);
//     fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
//     await em.persistAndFlush(fridges);
//     productBodys = [
//         {name: productFixtures[2].name, size: productFixtures[1].size, user: users[1].id, fridge: fridges[1].id},
//         {name: productFixtures[1].name, size: productFixtures[1].size, user: users[0].id, fridge: fridges[1].id},
//     ]
//     products = productBodys.map((x) => em.create(Product, x));
//     await em.persistAndFlush(products)
//     })
//     it('Test all user endpoints in sequence', async () => {
//         const em = orm.em.fork();
//         const originalCount = await em.count(User, null);
//         const { body: createUserResponse } = await request
//         .post(`/api/users`)
//         .send({
//             firstName: 'firstNameTest',
//             lastName: 'lastNameTest',
//             email: 'test.email@panenco.com',
//             password: 'testPassword1',
//         } as UserBody)
//         .expect(StatusCode.created);
//         const count = await em.count(User, null);
//         expect(count === originalCount + 1).true;
//         const { body: createProduct1Response } = await request
//         .post(`/api/products`)
//         .send({
//             name: 'testNameProduct1',
//             size: 3,
//             user: createUserResponse.id,
//             fridge: fridges[1].id,
//         } as ProductAddBody)
//         .expect(StatusCode.created);
//         const { body: createProduct2Response } = await request
//         .post(`/api/products`)
//         .send({
//             name: 'testNameProduct2',
//             size: 4,
//             user: createUserResponse.id,
//             fridge: fridges[0].id,
//         } as ProductAddBody)
//         .expect(StatusCode.created);
//         const { body: getAllProductsResponse } = await request
//         .get(`/api/users/${createUserResponse.id}`)
//         .expect(200);
//         expect(getAllProductsResponse.length).equals(2)
//         expect(getAllProductsResponse.some((x) => x.name === 'testNameProduct1')).true
//         expect(getAllProductsResponse.some((x) => x.name === 'testNameProduct2')).true
//         expect(getAllProductsResponse.some((x) => x.size === 3)).true
//         expect(getAllProductsResponse.some((x) => x.size === 4)).true
//         expect(getAllProductsResponse.some((x) => x.id === createProduct1Response.id)).true
//         expect(getAllProductsResponse.some((x) => x.id === createProduct2Response.id)).true
//         const { body: getLocationProductsResponse } = await request
//         .get(`/api/users/location/${createUserResponse.id}`)
//         .query({search: '2'})
//         .expect(200);
//         expect(getLocationProductsResponse.length).equals(1)
//         expect(getLocationProductsResponse.some((x) => x.name === 'testNameProduct1')).true
//         expect(getLocationProductsResponse.some((x) => x.size === 3)).true
//         expect(getLocationProductsResponse.some((x) => x.id === createProduct1Response.id)).true
//         const originalUserCount = await em.count(Product, {user: users[1].id})
//         const userCount = await em.count(Product, {user: createUserResponse.id})
//         await request
//         .patch(`/api/users/gift/${createUserResponse.id}`)
//         .send({
//             receiver: users[1].id,
//         } as UserGiftBody)
//         .expect(StatusCode.ok);
//         const newUserCount = await em.count(Product, {user: users[1].id})
//         expect(originalUserCount + userCount).equals(newUserCount);
//         await request
//         .delete(`/api/users/${users[1].id}`)
//         .expect(StatusCode.ok);
//         const count2 = await em.count(Product, null);
//         expect(count2).equals(1);
//     })
//     it('Test password check for creating a user', async () => {
//         const { body: createUserResponse } = await request
//         .post(`/api/users`)
//         .send({
//             firstName: 'firstNameTest',
//             lastName: 'lastNameTest',
//             email: 'test.email@panenco.com',
//             password: 'test',
//         } as UserBody)
//         .expect(StatusCode.badRequest);
//     });
// });
//# sourceMappingURL=user.integration.test.js.map