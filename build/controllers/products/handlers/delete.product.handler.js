"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const ingredients_entity_1 = require("../../../entities/ingredients.entity");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const deleteProduct = async (productId) => {
    const em = core_1.RequestContext.getEntityManager();
    const product = await em.findOneOrFail(product_entity_1.Product, productId);
    const ingredients = await em.find(ingredients_entity_1.Ingredient, { product: productId });
    const fridgeProducts = await em.find(fridgeProduct_entity_1.FridgeProduct, { product: productId });
    await em.removeAndFlush(product);
    await em.removeAndFlush(ingredients);
    await em.removeAndFlush(fridgeProducts);
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=delete.product.handler.js.map