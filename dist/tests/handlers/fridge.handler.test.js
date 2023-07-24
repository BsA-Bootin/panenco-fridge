"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../entities/user.entity");
const orm_config_1 = __importDefault(require("../../orm.config"));
const fridge_entity_1 = require("../../entities/fridge.entity");
const product_entity_1 = require("../../entities/product.entity");
const chai_1 = require("chai");
const fridgeProduct_entity_1 = require("../../entities/fridgeProduct.entity");
const put_fridgeProduct_handler_1 = require("../../controllers/products/handlers/put.fridgeProduct.handler");
const userFixtures = [
    {
        firstName: 'firstTest1',
        lastName: 'lastTest1',
        email: 'test-user+1@panenco.com',
        password: 'Password1',
    },
    {
        firstName: 'firstTest2',
        lastName: 'lastTest2',
        email: 'test-user+2@panenco.com',
        password: 'Password2',
    },
    {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'test-user+3@panenco.com',
        password: 'Password3',
    },
];
const fridgeFixtures = [
    {
        location: 1,
        capacity: 5,
    },
    {
        location: 2,
        capacity: 10,
    },
];
const productFixtures = [
    {
        name: 'banana',
        size: 3
    },
    {
        name: 'apple',
        size: 2
    },
    {
        name: 'milk',
        size: 5
    },
];
describe('Fridge Handler Tests', () => {
    let orm;
    let users;
    let fridges;
    let productBodes = [];
    let products;
    let fridgeProducts;
    let fridgeProductBodies = [];
    before(async () => {
        orm = await core_1.MikroORM.init(orm_config_1.default);
    });
    beforeEach(async () => {
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
        const em = orm.em.fork();
        users = userFixtures.map((x) => em.create(user_entity_1.User, x));
        await em.persistAndFlush(users);
        fridges = fridgeFixtures.map((x) => em.create(fridge_entity_1.Fridge, x));
        await em.persistAndFlush(fridges);
        productBodes = [
            { name: productFixtures[0].name, size: productFixtures[0].size },
            { name: productFixtures[1].name, size: productFixtures[1].size },
            { name: productFixtures[2].name, size: productFixtures[2].size },
            { name: productFixtures[1].name, size: productFixtures[2].size },
        ];
        products = productBodes.map((x) => em.create(product_entity_1.Product, x));
        await em.persistAndFlush(products);
    });
    it('put product in fridge', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                userId: users[0].id,
                fridgeId: fridges[0].id,
            };
            const productId = products[0].id;
            try {
                const res = await (0, put_fridgeProduct_handler_1.putFridgeProduct)(productId, body);
            }
            catch (error) {
                (0, chai_1.expect)(true, 'error thrown').true;
                return;
            }
            (0, chai_1.expect)(true, 'should have thrown an error').false;
        });
    });
    it('put product in fridge but capacity exceeded', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                userId: users[0].id,
                fridgeId: fridges[0].id,
            };
            const productId = products[0].id;
            const originalCount = await orm.em.count(fridgeProduct_entity_1.FridgeProduct, { fridge: body.fridgeId, product: productId, user: body.userId });
            const res = await (0, put_fridgeProduct_handler_1.putFridgeProduct)(productId, body);
            const count = await orm.em.count(fridgeProduct_entity_1.FridgeProduct, { fridge: body.fridgeId, product: productId, user: body.userId });
            (0, chai_1.expect)(originalCount + 1).equal(count);
        });
    });
    // it('create fridge', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {
    //             location: 3,
    //             capacity: 8, 
    //         }
    //         const res = await createFridge(body);
    //         const createdFridge = await orm.em.findOne(Fridge, {location: 3})
    //         expect(createdFridge.id).equal(res.id);
    //     });
    // });
    // it('delete fridge', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const initialCount = await orm.em.count(Product);
    //         const count = await orm.em.count(Product, {fridge: fridges[1].id, user: users[1].id});
    //         await deleteFridge(fridges[1].id, users[1].id);
    //         const newCount = await orm.em.count(Product);
    //         expect(initialCount - count).equals(newCount);
    //     });
    // });
    // it('delete fridge given non existing id', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         try {
    //             const res = await deleteFridge('non-existing', users[1].id);
    //         } catch (error) {
    //             expect(true, 'error thrown').true;
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     })
    // });
    // it('get fridge', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const res = await getFridge(fridges[1].id, {userId: users[1].id});
    //         expect(res.some((x) => x.name === productFixtures[1].name)).true
    //         expect(res.some((x) => x.name === productFixtures[2].name)).true
    //         expect(res.some((x) => x.size === productFixtures[1].size)).true
    //         expect(res.some((x) => x.size === productFixtures[2].size)).true
    //         expect(res.some((x) => x.id === products[1].id)).true
    //         expect(res.some((x) => x.id === products[2].id)).true
    //     });
    // });
    // it('get fridge given non existing id', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         try {
    //             const res = await getFridge('non-existing', {userId: users[1].id});
    //         } catch (error) {
    //             expect(true, 'error thrown').true;
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     })
    // });
    // it('gift fridge', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {receiver: users[0].id, sender: users[1].id};
    //         const initialCount = await orm.em.count(Product, {user: users[0].id, fridge: fridges[1].id})
    //         const count = await orm.em.count(Product, {user: users[1].id, fridge: fridges[1].id})
    //         await giftFridge(fridges[1].id, body);
    //         const newCount = await orm.em.count(Product, {user: users[0].id, fridge: fridges[1].id})
    //         expect(initialCount + count).equals(newCount);
    //     });
    // });
    // it('gift fridge given non existing id', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         try {
    //             const body = {receiver: users[1].id, sender: users[1].id};
    //             const res = await giftFridge('non-existing', body);
    //         } catch (error) {
    //             expect(true, 'error thrown').true;
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     })
    // });
});
