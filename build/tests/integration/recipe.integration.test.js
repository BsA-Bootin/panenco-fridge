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
// import { RecipeCreateBody, RecipeIngredients, RecipeName } from "../../contracts/recipe.body";
// import { Recipe } from "../../entities/recipe.entity";
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
// ];
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
// const recipeFixtures: Recipe[] = [
//     {
//         name: 'test name1',
//         ingredients: ["banana", "apple", "milk", "soda"],
//     }   as Recipe,
//     {
//         name: 'test name2',
//         ingredients: ["banana", "apple"],
//     }   as Recipe,
// ];
// describe('Integration Recipe tests', () => {
//     let users: User[]
//     let fridges: Fridge[]
//     let productBodys: {}[] = []
//     let products: Product[]
//     let recipeBodys: {}[] = []
//     let recipes: Recipe[]
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
//     recipeBodys = [
//         {name: recipeFixtures[0].name, ingredients: recipeFixtures[0].ingredients,  user: users[0].id}, 
//         {name: recipeFixtures[1].name, ingredients: recipeFixtures[1].ingredients,  user: users[0].id},
//     ]
//     recipes = recipeBodys.map((x) => em.create(Recipe, x));
//     await em.persistAndFlush(recipes);
//     })
//     it('Test all recipe endpoints in sequence', async () => {
//         const em = orm.em.fork();
//         const originalCount = await em.count(Recipe, null);
//         const creationBody = {
//             name: 'recipeTest',
//             ingredients: ['apple', 'cheese'],
//             user: users[0].id,
//         };
//         const { body: createRecipeResponse } = await request
//         .post(`/api/recipes`)
//         .send( creationBody as RecipeCreateBody)
//         .expect(StatusCode.created);
//         const count = await em.count(Recipe, null);
//         expect(count).equals(originalCount + 1);
//         const { body: getRecipeResponse } = await request
//         .get(`/api/recipes/${createRecipeResponse.id}`)
//         .expect(StatusCode.ok);
//         expect(getRecipeResponse.name).equals(creationBody.name);
//         expect(getRecipeResponse.ingredients.toString()).equals(creationBody.ingredients.toString());
//         const { body: getAllRecipeResponse } = await request
//         .get(`/api/recipes/user/${users[0].id}`)
//         .expect(StatusCode.ok);
//         expect(getAllRecipeResponse.some((x) => x.name === recipeFixtures[0].name));
//         expect(getAllRecipeResponse.some((x) => x.name === creationBody.name));
//         expect(getAllRecipeResponse.some((x) => x.ingredients.toString() === recipeFixtures[0].ingredients.toString()));
//         expect(getAllRecipeResponse.some((x) => x.ingredients === creationBody.ingredients.toString()));
//         expect(getAllRecipeResponse.some((x) => x.id === recipes[0].id));
//         expect(getAllRecipeResponse.some((x) => x.id === createRecipeResponse.id));
//         const { body: getMissingResponse } = await request
//         .get(`/api/recipes/missing/${createRecipeResponse.id}`)
//         .expect(StatusCode.ok);
//         expect(getMissingResponse.some((x) => x.name === 'cheese'));
//         expect(getMissingResponse.some((x) => x.name !== 'apple'));
//         const { body: addRecipeResponse } = await request
//         .patch(`/api/recipes/add/${createRecipeResponse.id}`)
//         .send( {ingredients: ['cookie']} as RecipeIngredients)
//         .expect(StatusCode.ok);
//         const { body: removeRecipeResponse } = await request
//         .patch(`/api/recipes/remove/${createRecipeResponse.id}`)
//         .send( {ingredients: ['cheese']} as RecipeIngredients)
//         .expect(StatusCode.ok);
//         const { body: nameRecipeResponse } = await request
//         .patch(`/api/recipes/name/${createRecipeResponse.id}`)
//         .send( {name: 'changeNameTest'} as RecipeName)
//         .expect(StatusCode.ok);
//         expect(nameRecipeResponse.name).equals('changeNameTest');
//         expect(nameRecipeResponse.ingredients.some((x) => x === 'cookie'));
//         expect(nameRecipeResponse.ingredients.some((x) => x !== 'cheese'));
//         expect(nameRecipeResponse.ingredients.some((x) => x === 'apple'));
//         await request
//         .delete(`/api/recipes/${createRecipeResponse.id}`)
//         .expect(StatusCode.ok);
//         const newCount = await em.count(Recipe, null);
//         expect(newCount).equals(originalCount);
//     });
// });
//# sourceMappingURL=recipe.integration.test.js.map