import supertest from "supertest";
import { App } from "../../app";
import { expect } from "chai";
import { StatusCode } from "@panenco/papi";
import { login } from "../../controllers/auth/handlers/login.handler";
import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import { FridgeProductAddBody, ProductAddBody, ProductGiftBody } from "../../contracts/product.body";
import { UserBody } from "../../contracts/user.body";
import { FridgeBody, FridgeGetBody } from "../../contracts/fridge.body";
import { Product } from "../../entities/product.entity";
import { Fridge } from "../../entities/fridge.entity";
import { Recipe } from "../../entities/recipe.entity";
import { FridgeProduct } from "../../entities/fridgeProduct.entity";
import { Ingredient } from "../../entities/ingredients.entity";
import { RecipeCreateBody, RecipeIngredients, RecipeName } from "../../contracts/recipe.body";


const userFixtures: User[] = [
    {
        firstName: 'firstTest1',
        lastName: 'lastTest1',
        email: 'test-user+1@panenco.com',
        password: 'Password1',
    }    as User,
    {
        firstName: 'firstTest2',
        lastName: 'lastTest2',
        email: 'test-user+2@panenco.com',
        password: 'Password2',
    }   as User,
    {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'test-user+3@panenco.com',
        password: 'Password3',
      } as User,
      {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'admin@panenco.com',
        password: 'Password3',
        role: 'admin',
      } as User,
    ];

const fridgeFixtures: Fridge[] = [
    {
        location: 1,
        capacity: 5,
    }   as Fridge,
    {
        location: 2,
        capacity: 10,
    }   as Fridge,
    ];

const productFixtures: Product[] = [
    {
        name: 'banana',
        size: 3
    }   as Product,
    {
        name: 'apple',
        size: 2
    }   as Product,
    {
        name: 'milk',
        size: 5
    }   as Product,
    {
        name: 'soda',
        size: 2
    }   as Product,
];

const recipeFixtures: Recipe[] = [
    {
        name: 'test name1',
    }   as Recipe,
    {
        name: 'test name2',
    }   as Recipe,
];

describe('Recipe Handler Tests', () => {
    let orm: MikroORM<PostgreSqlDriver>
    let users: User[]
    let fridges: Fridge[]
    let productBodys: {}[] = []
    let products: Product[]
    let recipeBodys: {}[] = []
    let recipes: Recipe[]
    let fridgeProducts: FridgeProduct[]
    let fridgeProductBodies = []
    let ingredients: Ingredient[]
    let ingredientBodies = []
    let request: supertest.SuperTest<supertest.Test>;

    before(async () => {
        const app = new App();
        await app.createConnection();
        orm = app.orm;
        request = supertest(app.host);
        });

    beforeEach(async () => {
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
        const em = orm.em.fork();
        users = userFixtures.map((x) => em.create(User, x));
        await em.persistAndFlush(users);
        fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
        await em.persistAndFlush(fridges);
        productBodys = [
            {name: productFixtures[0].name, size: productFixtures[0].size},
            {name: productFixtures[1].name, size: productFixtures[1].size},
            {name: productFixtures[2].name, size: productFixtures[2].size},
            {name: productFixtures[3].name, size: productFixtures[3].size},
        ]
        products = productBodys.map((x) => em.create(Product, x));
        await em.persistAndFlush(products);
        recipeBodys = [
            {name: recipeFixtures[0].name, user: users[1].id}, 
            {name: recipeFixtures[1].name, user: users[0].id},
        ]
        recipes = recipeBodys.map((x) => em.create(Recipe, x));
        await em.persistAndFlush(recipes);
        fridgeProductBodies = [
            {user: users[0].id, fridge: fridges[0].id, product: products[3].id},
            {user: users[1].id, fridge: fridges[1].id, product: products[2].id},
            {user: users[1].id, fridge: fridges[1].id, product: products[1].id},
        ]
        fridgeProducts = fridgeProductBodies.map((x) => em.create(FridgeProduct, x));
        await em.persistAndFlush(fridgeProducts)
        ingredientBodies = [
            {recipe: recipes[0].id, amount: '', product: products[0].id},
            {recipe: recipes[0].id, amount: '', product: products[1].id},
            {recipe: recipes[0].id, amount: '', product: products[2].id},
            {recipe: recipes[0].id, amount: '', product: products[3].id},
        ]
        ingredients = ingredientBodies.map((x) => em.create(Ingredient, x))
        await em.persistAndFlush(ingredients)
    });

    it('Test all recipe endpoints in sequence', async () => {

        const em = orm.em.fork();
        const originalCount = await em.count(Recipe, null);

        const creationBody = {
            name: 'recipeTest',
            user: users[0].id,
        };

        const { body: createRecipeResponse } = await request
        .post(`/api/recipes`)
        .send( creationBody as RecipeCreateBody)
        .expect(StatusCode.created);

        const count = await em.count(Recipe, null);
        expect(count).equals(originalCount + 1);

        const { body: getRecipeResponse } = await request
        .get(`/api/recipes/${createRecipeResponse.id}`)
        .expect(StatusCode.ok);

        expect(getRecipeResponse.name).equals(creationBody.name);

        const { body: getAllRecipeResponse } = await request
        .get(`/api/recipes/user/${users[0].id}`)
        .expect(StatusCode.ok);

        expect(getAllRecipeResponse.some((x) => x.name === recipeFixtures[0].name));
        expect(getAllRecipeResponse.some((x) => x.name === creationBody.name));
        expect(getAllRecipeResponse.some((x) => x.id === recipes[0].id));
        expect(getAllRecipeResponse.some((x) => x.id === createRecipeResponse.id));

        const { body: getMissingResponse } = await request
        .get(`/api/recipes/missing/${createRecipeResponse.id}`)
        .expect(StatusCode.ok);

        expect(getMissingResponse.some((x) => x.name === 'cheese'));
        expect(getMissingResponse.some((x) => x.name !== 'apple'));

        const { body: nameRecipeResponse } = await request
        .patch(`/api/recipes/name/${createRecipeResponse.id}`)
        .send( {name: 'changeNameTest'} as RecipeName)
        .expect(StatusCode.ok);

        expect(nameRecipeResponse.name).equals('changeNameTest');

        const newCount = await em.count(Recipe, null);
        expect(newCount).equals(originalCount + 1);
    });
});