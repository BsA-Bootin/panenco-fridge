import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import ormConfig from "../../orm.config";
import { Fridge } from "../../entities/fridge.entity";
import { Product } from "../../entities/product.entity";
import { expect } from "chai";
import { login } from "../../controllers/auth/handlers/login.handler";
import { getAccessTokenData } from "@panenco/papi";
import { MyToken } from "../../contracts/admin.requirements/token.type";

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
        attempts: 3,
    }   as User,
    {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'test-user+3@panenco.com',
        password: 'Password3',
      } as User,
    ];

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
    });

    it('login normal user', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[0].email, 
                password: userFixtures[0].password, 
            }
            const res = await login(body);
            const decodedToken: MyToken = getAccessTokenData(res.token, 'jwtSecretFromConfigHere');
            expect(decodedToken.userId).equals(users[0].id);
            expect(decodedToken.role).equals('user');
        });
    });

    it('login normal user wrong password', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[0].email, 
                password: 'wrongPassword', 
            }
            try {
                const res = await login(body);;
            } catch (error) {
                expect(error.message).equal('Password is incorrect');
                return;
            }
            expect(true, 'should have thrown an error').false;
        });
    });

    it('login normal user too many attempts', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[1].email, 
                password: userFixtures[1].password, 
            }
            try {
                const res = await login(body);;
            } catch (error) {
                expect(error.message).equal('Too many tries');
                return;
            }
            expect(true, 'should have thrown an error').false;
        });
    });

    it('login normal user user not found', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: 'userNotFound', 
                password: userFixtures[1].password, 
            }
            try {
                const res = await login(body);;
            } catch (error) {
                expect(error)
                return;
            }
            expect(true, 'should have thrown an error').false;
        });
    });
});
