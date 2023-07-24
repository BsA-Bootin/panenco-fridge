"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../entities/user.entity");
const orm_config_1 = __importDefault(require("../../orm.config"));
const chai_1 = require("chai");
const login_handler_1 = require("../../controllers/auth/handlers/login.handler");
const papi_1 = require("@panenco/papi");
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
        attempts: 3,
    },
    {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'test-user+3@panenco.com',
        password: 'Password3',
    },
];
describe('User Handler Tests', () => {
    let orm;
    let users;
    let fridges;
    let productBodys = [];
    let products;
    before(async () => {
        orm = await core_1.MikroORM.init(orm_config_1.default);
    });
    beforeEach(async () => {
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
        const em = orm.em.fork();
        users = userFixtures.map((x) => em.create(user_entity_1.User, x));
        await em.persistAndFlush(users);
    });
    it('login normal user', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[0].email,
                password: userFixtures[0].password,
            };
            const res = await (0, login_handler_1.login)(body);
            const decodedToken = (0, papi_1.getAccessTokenData)(res.token, 'jwtSecretFromConfigHere');
            (0, chai_1.expect)(decodedToken.userId).equals(users[0].id);
            (0, chai_1.expect)(decodedToken.role).equals('user');
        });
    });
    it('login normal user wrong password', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[0].email,
                password: 'wrongPassword',
            };
            try {
                const res = await (0, login_handler_1.login)(body);
                ;
            }
            catch (error) {
                (0, chai_1.expect)(error.message).equal('Password is incorrect');
                return;
            }
            (0, chai_1.expect)(true, 'should have thrown an error').false;
        });
    });
    it('login normal user too many attempts', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: userFixtures[1].email,
                password: userFixtures[1].password,
            };
            try {
                const res = await (0, login_handler_1.login)(body);
                ;
            }
            catch (error) {
                (0, chai_1.expect)(error.message).equal('Too many tries');
                return;
            }
            (0, chai_1.expect)(true, 'should have thrown an error').false;
        });
    });
    it('login normal user user not found', async () => {
        await core_1.RequestContext.createAsync(orm.em.fork(), async () => {
            const body = {
                email: 'userNotFound',
                password: userFixtures[1].password,
            };
            try {
                const res = await (0, login_handler_1.login)(body);
                ;
            }
            catch (error) {
                (0, chai_1.expect)(error);
                return;
            }
            (0, chai_1.expect)(true, 'should have thrown an error').false;
        });
    });
});
