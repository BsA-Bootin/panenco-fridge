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
import { FridgeBody } from "../../contracts/fridge.body";
import { Product } from "../../entities/product.entity";
import { Fridge } from "../../entities/fridge.entity";
import { Recipe } from "../../entities/recipe.entity";
import { FridgeProduct } from "../../entities/fridgeProduct.entity";
import { Ingredient } from "../../entities/ingredients.entity";


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
            {name: recipeFixtures[1].name, user: users[1].id},
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

    it('Test all product endpoints in sequence', async () => {

        const em = orm.em.fork();
        const originalCount = await em.count(Product, null);

        const { body: createProductResponse } = await request
        .post(`/api/products`)
        .send({
            name: 'testNameProduct1',
            size: 3,
        } as ProductAddBody)
        .expect(StatusCode.created);

        const count = await em.count(Product, null);
        expect(count === originalCount + 1).true;

        const { body: getProductResponse } = await request
        .get(`/api/products/${createProductResponse.id}`)
        .expect(200);
        expect(getProductResponse.name).equal('testNameProduct1');
        expect(getProductResponse.size).equal(3);


        const { body: createUser2Response } = await request
        .post(`/api/users`)
        .send({
            firstName: 'testFirst2Name',
            lastName: 'testLast2Name',
            email: 'test2.mail@panenco.com',
            password: 'testPassword2',
        } as UserBody)
        .set('x-auth', 'api-key')
        .expect(StatusCode.created);

        const { body: putProductResponse } = await request
        .post(`/api/products/putInFridge/:${createProductResponse.id}`)
        .send({
            fridgeId: fridges[0].id,
            userId: users[0].id,
        } as FridgeProductAddBody)
        .set('x-auth', 'api-key')
        .expect(StatusCode.created);

        await request
        .patch(`/api/products/gift/${createProductResponse.id}`)
        .send({
            receiver: createUser2Response.id,
            sender: users[0].id,
            fridgeId: fridges[0].id,
        } as ProductGiftBody)
        .expect(StatusCode.ok);

        const product = await em.findOne(FridgeProduct, createProductResponse.id)
        const newOwner = await em.findOne(User, createUser2Response.id)
        expect(newOwner.id).equal(product.user.id);

        await request
        .delete(`/api/products/${createProductResponse.id}`)
        .expect(StatusCode.ok);

        const count2 = await em.count(Product, null);
        expect(count2).equals(originalCount);


        // const {body: loginResponse} = await request
        // .post('/api/auth/tokens')
        // .send({
        //     email: 'test-user+1@panenco.com',
        //     password: 'real secret stuff'})
        // .expect(StatusCode.ok)
        // .set('x-auth', token)


        // const token = loginResponse.token;
    })
});