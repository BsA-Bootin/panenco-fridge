"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftProduct = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../../entities/user.entity");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const giftProduct = async (productId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeProduct = await em.findOneOrFail(fridgeProduct_entity_1.FridgeProduct, { product: productId, user: body.sender, fridge: body.fridgeId });
    (0, core_1.wrap)(fridgeProduct).assign({ user: await em.findOneOrFail(user_entity_1.User, body.receiver) });
    await em.flush();
};
exports.giftProduct = giftProduct;
