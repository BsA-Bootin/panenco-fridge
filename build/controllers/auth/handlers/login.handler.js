"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const papi_1 = require("@panenco/papi");
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../../entities/user.entity");
const login = async (body) => {
    const em = core_1.RequestContext.getEntityManager();
    const user = await em.findOneOrFail(user_entity_1.User, { email: body.email });
    if (user.attempts >= 3) {
        throw new papi_1.Unauthorized('TooManyTries', 'Too many tries');
    }
    if (body.password !== user.password) {
        user.assign({ attempts: user.attempts + 1 });
        await em.flush();
        throw new papi_1.Unauthorized('IncorrectPassword', 'Password is incorrect');
    }
    const token = await (0, papi_1.createAccessToken)('jwtSecretFromConfigHere', 600, { userId: user.id, role: user.role });
    return token;
};
exports.login = login;
//# sourceMappingURL=login.handler.js.map