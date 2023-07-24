"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFridge = void 0;
const core_1 = require("@mikro-orm/core");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const deleteFridge = async (fridgeId, userId) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeProducts = await em.find(fridgeProduct_entity_1.FridgeProduct, { fridge: fridgeId, user: userId });
    em.removeAndFlush(fridgeProducts);
    fridgeProducts.forEach(async (product) => {
        await em.removeAndFlush(product);
    });
};
exports.deleteFridge = deleteFridge;
//# sourceMappingURL=delete.fridge.handler.js.map