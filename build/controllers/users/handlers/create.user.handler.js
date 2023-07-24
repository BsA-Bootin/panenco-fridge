"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../../entities/user.entity");
const papi_1 = require("@panenco/papi");
const createUser = async (body) => {
    const em = core_1.RequestContext.getEntityManager();
    if ((await em.find(user_entity_1.User, { email: body.email })).length !== 0) {
        throw new papi_1.BadRequest("NotUniqueEmail", "User email already exists");
    }
    const user = em.create(user_entity_1.User, body);
    await em.persistAndFlush(user);
    return user;
};
exports.createUser = createUser;
//# sourceMappingURL=create.user.handler.js.map