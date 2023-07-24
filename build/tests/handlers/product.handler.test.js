// import { MikroORM, RequestContext } from "@mikro-orm/core";
// import { PostgreSqlDriver } from "@mikro-orm/postgresql";
// import { User } from "../../entities/user.entity";
// import ormConfig from "../../orm.config";
// import { Fridge } from "../../entities/fridge.entity";
// import { Product } from "../../entities/product.entity";
// import { expect } from "chai";
// import { createProduct } from "../../controllers/products/handlers/create.product.handler";
// import { deleteProduct } from "../../controllers/products/handlers/delete.product.handler";
// import { getProduct } from "../../controllers/products/handlers/get.product.handler";
// import { giftProduct } from "../../controllers/fridgeProducts/handlers/gift.product.handler";
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
// describe('Product Handler Tests', () => {
//     let orm: MikroORM<PostgreSqlDriver>
//     let users: User[]
//     let fridges: Fridge[]
//     let productBodys: {}[] = []
//     let products: Product[]
//     before(async () => {
//         orm = await MikroORM.init(ormConfig);
//     })
//     beforeEach(async () => {
//         await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
//         await orm.getMigrator().up();
//         const em = orm.em.fork();
//         users = userFixtures.map((x) => em.create(User, x));
//         await em.persistAndFlush(users);
//         fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
//         await em.persistAndFlush(fridges);
//         productBodys = [
//             {name: productFixtures[0].name, size: productFixtures[0].size, user: users[0].id, fridge: fridges[0].id},
//             {name: productFixtures[1].name, size: productFixtures[1].size, user: users[1].id, fridge: fridges[1].id}
//         ];
//         products = productBodys.map((x) => em.create(Product, x));
//         await em.persistAndFlush(products)
//     });
//     it('create product', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             const body = {
//                 name: productFixtures[2].name, 
//                 size: productFixtures[2].size, 
//                 user: users[0].id, 
//                 fridge: fridges[1].id
//             }
//             const res = await createProduct(body);
//             const createdProduct = await orm.em.findOne(Product, {name: productFixtures[2].name})
//             expect(createdProduct.id).equal(res.id);
//         });
//     });
//     it('create product fridge capacity exceeded', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             const body = {
//                 name: productFixtures[0].name, 
//                 size: productFixtures[0].size, 
//                 user: users[0].id, 
//                 fridge: fridges[0].id
//             }
//             try {
//                 const res = await createProduct(body);
//             } catch (error) {
//                 expect(error.message).equal('Capacity of the fridge has been exceeded');
//                 return;
//             }
//             expect(true, 'should have thrown an error').false;
//         })
//     });
//     it('delete product', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             const initialCount = await orm.em.count(Product);
//             await deleteProduct(products[0].id);
//             const newCount = await orm.em.count(Product);
//             expect(initialCount - 1).equal(newCount);
//         });
//     });
//     it('delete product given non existing id', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             try {
//                 const res = await deleteProduct('non-existing');
//             } catch (error) {
//                 expect(true, 'error thrown').true;
//                 return;
//             }
//             expect(true, 'should have thrown an error').false;
//         })
//     });
//     it('get product', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             const res = await getProduct(products[0].id);
//             expect(res.id).equal(products[0].id);
//             expect(res.size).equal(products[0].size);
//             const gettedProduct = await orm.em.findOne(Product, products[0].id);
//             expect(res.id).equal(gettedProduct.id);
//         });
//     });
//     it('get product given non existing id', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             try {
//                 const res = await getProduct('non-existing');
//             } catch (error) {
//                 expect(true, 'error thrown').true;
//                 return;
//             }
//             expect(true, 'should have thrown an error').false;
//         })
//     });
//     it('gift product', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             const body = {receiver: users[1].id};
//             await giftProduct(products[0].id, body);
//             const giftedProduct = await orm.em.findOne(Product, products[0].id);
//             expect(giftedProduct.user.id).equals(users[1].id);
//         });
//     });
//     it('gift product given non existing id', async () => {
//         await RequestContext.createAsync(orm.em.fork(), async () => {
//             try {
//                 const body = {receiver: users[1].id};
//                 const res = await giftProduct('non-existing', body);
//             } catch (error) {
//                 expect(true, 'error thrown').true;
//                 return;
//             }
//             expect(true, 'should have thrown an error').false;
//         })
//     });
// });
//# sourceMappingURL=product.handler.test.js.map