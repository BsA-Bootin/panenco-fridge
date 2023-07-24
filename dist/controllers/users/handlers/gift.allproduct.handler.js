"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftAllProducts = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../../entities/user.entity");
const giftAllProducts = async (userId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const receiver = await em.findOneOrFail(user_entity_1.User, body.receiver);
    const user = await em.findOneOrFail(user_entity_1.User, userId, { populate: ['fridgeProducts'] });
    user.fridgeProducts.getItems().forEach(async (product) => {
        (0, core_1.wrap)(product).assign({ user: receiver });
    });
    await em.flush();
};
exports.giftAllProducts = giftAllProducts;
