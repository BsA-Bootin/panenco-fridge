"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProducts = void 0;
const core_1 = require("@mikro-orm/core");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const deleteAllProducts = async (userId) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeProducts = await em.find(fridgeProduct_entity_1.FridgeProduct, { user: userId });
    fridgeProducts.forEach(async (product) => {
        await em.removeAndFlush(product);
    });
};
exports.deleteAllProducts = deleteAllProducts;
