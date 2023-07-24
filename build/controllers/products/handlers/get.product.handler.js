"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const getProduct = async (productId) => {
    const em = core_1.RequestContext.getEntityManager();
    const product = await em.findOneOrFail(product_entity_1.Product, productId);
    return product;
};
exports.getProduct = getProduct;
//# sourceMappingURL=get.product.handler.js.map