"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsLocation = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const fridge_entity_1 = require("../../../entities/fridge.entity");
const getProductsLocation = async (userId, location) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridgeIds = [];
    const fridges = await em.find(fridge_entity_1.Fridge, { location: Number(location) });
    fridges.map(fridge => fridgeIds.push(fridge.id));
    return await em.find(product_entity_1.Product, { fridgeProducts: { user: userId, fridge: fridgeIds } });
};
exports.getProductsLocation = getProductsLocation;
//# sourceMappingURL=get.productsLocation.handler.js.map