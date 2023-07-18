import supertest from "supertest";
import { App } from "../../app";
import { expect } from "chai";
import { StatusCode } from "@panenco/papi";
import { login } from "../../controllers/auth/handlers/login.handler";
import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import { ProductAddBody, ProductGiftBody } from "../../contracts/product.body";
import { UserBody } from "../../contracts/user.body";
import { FridgeBody, FridgeGetBody } from "../../contracts/fridge.body";
import { Product } from "../../entities/product.entity";
import { Fridge } from "../../entities/fridge.entity";
import { CreateFridgeView } from "../../contracts/fridge.view";

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
        firstName: 'adminTest1',
        lastName: 'adminTest1',
        email: 'admin@panenco.com',
        password: 'Password1',
        role: 'admin',
    }    as User,
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
]

describe('Integration Fridge tests', () => {
    let users: User[]
    let fridges: Fridge[]
    let productBodys: {}[] = []
    let products: Product[]

    let request: supertest.SuperTest<supertest.Test>;
    let orm: MikroORM<PostgreSqlDriver>
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
        {name: productFixtures[2].name, size: productFixtures[2].size, user: users[1].id, fridge: fridges[1].id},
        {name: productFixtures[1].name, size: productFixtures[2].size, user: users[0].id, fridge: fridges[1].id},
    ]
    products = productBodys.map((x) => em.create(Product, x));
    await em.persistAndFlush(products)
    })

    it('Test all fridge endpoints in sequence', async () => {

        const {body: loginUserResponse} = await request
        .post('/api/auth/tokens')
        .send({
            email: userFixtures[0].email,
            password: userFixtures[0].password})
        .expect(StatusCode.ok)

        const userToken = loginUserResponse.token;

        const {body: loginAdminResponse} = await request
        .post('/api/auth/tokens')
        .send({
            email: userFixtures[3].email,
            password: userFixtures[3].password})
        .expect(StatusCode.ok)

        const adminToken = loginAdminResponse.token;

        const em = orm.em.fork();
        const originalCount = await em.count(Product, null);

        const { body: createFridgeResponse } = await request
        .post(`/api/fridges`)
        .send({
            capacity: 8,
            location: 3,
        } as FridgeBody)
        .set('x-auth', adminToken)
        .expect(StatusCode.created);

        const count = await em.count(Fridge, null);
        expect(count === originalCount + 1).true;

        const { body: createProduct1Response } = await request
        .post(`/api/products`)
        .send({
            name: 'testNameProduct1',
            size: 3,
            user: users[0].id,
            fridge: createFridgeResponse.id,
        } as ProductAddBody)
        .expect(StatusCode.created);

        const { body: createProduct2Response } = await request
        .post(`/api/products`)
        .send({
            name: 'testNameProduct2',
            size: 4,
            user: users[0].id,
            fridge: createFridgeResponse.id,
        } as ProductAddBody)
        .expect(StatusCode.created);

        const { body: getFridgeResponse } = await request
        .get(`/api/fridges/${createFridgeResponse.id}`)
        .send({
            userId: users[0].id,
        } as FridgeGetBody)
        .set('x-auth', userToken)
        .expect(200);

        expect(getFridgeResponse.length).equals(2)
        expect(getFridgeResponse.some((x) => x.name === 'testNameProduct1')).true
        expect(getFridgeResponse.some((x) => x.name === 'testNameProduct2')).true
        expect(getFridgeResponse.some((x) => x.size === 3)).true
        expect(getFridgeResponse.some((x) => x.size === 4)).true
        expect(getFridgeResponse.some((x) => x.id === createProduct1Response.id)).true
        expect(getFridgeResponse.some((x) => x.id === createProduct2Response.id)).true

        const originalUserFridgeCount = await em.count(Product, {fridge: createFridgeResponse.id, user: users[1].id})
        const userFridgeCount = await em.count(Product, {fridge: createFridgeResponse.id, user: users[0].id})

        await request
        .patch(`/api/fridges/gift/${createFridgeResponse.id}`)
        .send({
            receiver: users[1].id,
            sender: users[0].id
        } as ProductGiftBody)
        .expect(StatusCode.ok);

        const newUserFridgeCount = await em.count(Product, {fridge: createFridgeResponse.id, user: users[1].id})
        expect(originalUserFridgeCount + userFridgeCount).equals(newUserFridgeCount);

        await request
        .delete(`/api/fridges/${createFridgeResponse.id}`)
        .query({search: users[1].id})
        .expect(StatusCode.ok);

        const count2 = await em.count(Product, null);
        expect(count2).equals(originalCount);
        const fridgeCount = await em.count(Product, {fridge: createFridgeResponse.id});
        expect(fridgeCount).equals(0);
    })

    it('Test Unauthorized get Fridge', async () => {
        const { body: createUserResponse } = await request
        .get(`/api/fridges/${fridges[1].id}`)
        .send({
            userId: users[0].id,
        } as FridgeGetBody)
        .expect(StatusCode.unauthorized);
    });

    it('Test Forbidden create Fridge', async () => {
        const {body: loginUserResponse} = await request
        .post('/api/auth/tokens')
        .send({
            email: userFixtures[0].email,
            password: userFixtures[0].password})
        .expect(StatusCode.ok)

        const userToken = loginUserResponse.token;

        const { body: createFridgeResponse } = await request
        .post(`/api/fridges`)
        .send({
            capacity: 8,
            location: 3,
        } as FridgeBody)
        .set('x-auth', userToken)
        .expect(StatusCode.forbidden);
    });

    it('Test too many password attempts', async () => {
        for (let i = 0; i < 3; i++) {
            await request
            .post('/api/auth/tokens')
            .send({
                email: userFixtures[0].email,
                password: 'wrongPassword'})
            .expect(StatusCode.unauthorized)
        }

        await request
        .post('/api/auth/tokens')
        .send({
            email: userFixtures[0].email,
            password: userFixtures[0].password})
        .expect(StatusCode.unauthorized)

    });
});