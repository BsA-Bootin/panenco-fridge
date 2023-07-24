"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const getAllProducts = async (userId) => {
    const em = core_1.RequestContext.getEntityManager();
    const products = await em.findOneOrFail(product_entity_1.Product, { fridgeProducts: { user: userId } });
    return products;
};
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=get.allproduct.handler.js.map