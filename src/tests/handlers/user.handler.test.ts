import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import ormConfig from "../../orm.config";
import { Fridge } from "../../entities/fridge.entity";
import { Product } from "../../entities/product.entity";
import { expect } from "chai";
import { createUser } from "../../controllers/users/handlers/create.user.handler";
import { deleteAllProducts } from "../../controllers/users/handlers/delete.allproduct.handler";
import { getAllProducts } from "../../controllers/users/handlers/get.allproduct.handler";
import { getProductsLocation } from "../../controllers/users/handlers/get.productsLocation.handler";
import { giftAllProducts } from "../../controllers/users/handlers/gift.allproduct.handler";

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

describe('User Handler Tests', () => {
    let orm: MikroORM<PostgreSqlDriver>
    let users: User[]
    let fridges: Fridge[]
    let productBodys: {}[] = []
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
        productBodys = [
            {name: productFixtures[0].name, size: productFixtures[0].size, user: users[0].id, fridge: fridges[0].id},
            {name: productFixtures[1].name, size: productFixtures[1].size, user: users[1].id, fridge: fridges[1].id},
            {name: productFixtures[2].name, size: productFixtures[2].size, user: users[1].id, fridge: fridges[1].id},
            {name: productFixtures[1].name, size: productFixtures[2].size, user: users[0].id, fridge: fridges[1].id}
        ]
        products = productBodys.map((x) => em.create(Product, x));
        await em.persistAndFlush(products)
    });

    it('create user', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                firstName: 'createTestFirst',
                lastName: 'createTestLast', 
                email: 'test.mail@panenco.com', 
                password: 'testPassword', 
            }
            const res = await createUser(body);
            const createdUser = await orm.em.findOne(User, body)
            expect(createdUser.id).equal(res.id);            
            expect(body.firstName).equal(res.firstName);
            expect(body.email).equal(res.email);
        });
    });

    it('create user but same email', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                firstName: 'createTestFirst',
                lastName: 'createTestLast', 
                email: 'test-user+1@panenco.com', 
                password: 'testPassword', 
            }
            try {
                const res = await createUser(body);
            } catch (error) {
                expect(error.message).equal('User email already exists');
                return;
            }
            expect(true, 'should have thrown an error').false;
        });
    });

    // it('create user bad password', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {
    //             firstName: 'string',
    //             lastName: 'createTestLast', 
    //             email: 'test.mail@panenco.com', 
    //             password: 'test', 
    //         }
    //         try {
    //             const res = await createUser(body);
    //         } catch (error) {
    //             expect(true, 'error thrown').true;
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     })
    // });

    it('delete all user products', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const initialCount = await orm.em.count(Product);
            const count = await orm.em.count(Product, {user: users[0].id});
            await deleteAllProducts(users[0].id);
            const newCount = await orm.em.count(Product);
            expect(initialCount - count).equals(newCount);
        });
    });

    it('delete all user products given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const res = await deleteAllProducts('non-existing');
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });

    it('get all user products', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const res = await getAllProducts(users[0].id);

            expect(res.length).equals(2)
            expect(res.some((x) => x.name === productFixtures[1].name)).true
            expect(res.some((x) => x.name === productFixtures[0].name)).true
            expect(res.some((x) => x.size === productFixtures[0].size)).true
            expect(res.some((x) => x.size === productFixtures[2].size)).true
            expect(res.some((x) => x.id === products[0].id)).true
            expect(res.some((x) => x.id === products[3].id)).true
        });
    });

    it('get all user products given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const res = await getAllProducts('non-existing');
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });

    it('get all user products at location', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const res = await getProductsLocation(users[0].id, fridges[1].location.toString());

            expect(res.length).equals(1)
            expect(res.some((x) => x.name === productFixtures[1].name)).true
            expect(res.some((x) => x.size === productFixtures[2].size)).true
            expect(res.some((x) => x.id === products[3].id)).true
        });
    });

    it('get all user products at location given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const res = await getAllProducts('non-existing');
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });

    it('gift all Products', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {receiver: users[0].id};
            const initialCount = await orm.em.count(Product, {user: users[0].id})
            const count = await orm.em.count(Product, {user: users[1].id})
            await giftAllProducts(users[1].id, body);
            const newCount = await orm.em.count(Product, {user: users[0].id})
            expect(initialCount + count).equals(newCount);
        });
    });

    it('gift all products given non existing id', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            try {
                const body = {receiver: users[1].id};
                const res = await giftAllProducts('non-existing', body);
            } catch (error) {
                expect(true, 'error thrown').true;
                return;
            }
            expect(true, 'should have thrown an error').false;
        })
    });
});
