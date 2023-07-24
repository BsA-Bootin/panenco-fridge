"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftFridge = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../../../entities/user.entity");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const giftFridge = async (fridgeId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeProducts = await em.find(fridgeProduct_entity_1.FridgeProduct, { user: body.sender, fridge: fridgeId });
    const user = await em.findOneOrFail(user_entity_1.User, body.receiver);
    fridgeProducts.forEach(async (fridgeProduct) => {
        (0, core_1.wrap)(fridgeProduct).assign({ user: user });
    });
    await em.flush();
};
exports.giftFridge = giftFridge;
