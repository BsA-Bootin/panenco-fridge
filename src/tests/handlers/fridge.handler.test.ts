import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import ormConfig from "../../orm.config";
import { Fridge } from "../../entities/fridge.entity";
import { Product } from "../../entities/product.entity";
import { expect } from "chai";
import { createFridge } from "../../controllers/fridges/handlers/create.fridge.handler";
import { deleteFridge } from "../../controllers/fridges/handlers/delete.fridge.handler";
import { getFridge } from "../../controllers/fridges/handlers/get.fridge.handler";
import { giftFridge } from "../../controllers/fridges/handlers/gift.fridge.handler";

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
]

describe('Fridge Handler Tests', () => {
    let orm: MikroORM<PostgreSqlDriver>
    let users: User[]
    let fridges: Fridge[]
    let productBodes: {}[] = []
    let products: Product[]
    before(async () => {
        orm = await MikroORM.init(ormConfig);
    })

    beforeEach(async () => {
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
        const em = orm.em.fork();
        users = userFixtures.map((x) => em.create(User, x));
        await em.persistAndFlush(users);
        fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
        await em.persistAndFlush(fridges);
        productBodes = [
            {name: productFixtures[0].name, size: productFixtures[0].size, user: users[0].id, fridge: fridges[0].id},
            {name: productFixtures[1].name, size: productFixtures[1].size, user: users[1].id, fridge: fridges[1].id},
            {name: productFixtures[2].name, size: productFixtures[2].size, user: users[1].id, fridge: fridges[1].id},
            {name: productFixtures[1].name, size: productFixtures[2].size, user: users[0].id, fridge: fridges[1].id}
        ]
        products = productBodes.map((x) => em.create(Product, x));
        await em.persistAndFlush(products)
    });

    it('create fridge', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                location: 3,
                capacity: 8, 
            }
            const res = await createFridge(body);
            const createdFridge = await orm.em.findOne(Fridge, {location: 3})
            expect(createdFridge.id).equal(res.id);
        });
    });

    it('delete fridge', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const initialCount = await orm.em.count(Product);
            const count = await orm.em.count(Product, {fridge: fridges[1].id, user: users[1].id});
            await deleteFridge(fridges[1].id, users[1].id);
            const newCount = await orm.em.count(Product);
            expect(initialCount - count).equals(newCount);
        });
    });

    it('delete fridge given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const res = await deleteFridge('non-existing', users[1].id);
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });

    it('get fridge', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const res = await getFridge(fridges[1].id, {userId: users[1].id});

            expect(res.some((x) => x.name === productFixtures[1].name)).true
            expect(res.some((x) => x.name === productFixtures[2].name)).true
            expect(res.some((x) => x.size === productFixtures[1].size)).true
            expect(res.some((x) => x.size === productFixtures[2].size)).true
            expect(res.some((x) => x.id === products[1].id)).true
            expect(res.some((x) => x.id === products[2].id)).true
        });
    });

    it('get fridge given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const res = await getFridge('non-existing', {userId: users[1].id});
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });

    it('gift fridge', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {receiver: users[0].id, sender: users[1].id};
            const initialCount = await orm.em.count(Product, {user: users[0].id, fridge: fridges[1].id})
            const count = await orm.em.count(Product, {user: users[1].id, fridge: fridges[1].id})
            await giftFridge(fridges[1].id, body);
            const newCount = await orm.em.count(Product, {user: users[0].id, fridge: fridges[1].id})
            expect(initialCount + count).equals(newCount);
        });
    });

    it('gift fridge given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const body = {receiver: users[1].id, sender: users[1].id};
                const res = await giftFridge('non-existing', body);
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });
});
