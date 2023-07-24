"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFridgeProduct = void 0;
const core_1 = require("@mikro-orm/core");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const deleteFridgeProduct = async (productId, fridgeId, userId) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeProduct = await em.findOneOrFail(fridgeProduct_entity_1.FridgeProduct, { product: productId, fridge: fridgeId, user: userId });
    await em.removeAndFlush(fridgeProduct);
};
exports.deleteFridgeProduct = deleteFridgeProduct;
