"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const createProduct = async (body) => {
    const em = core_1.RequestContext.getEntityManager();
    const product = em.create(product_entity_1.Product, body);
    await em.persistAndFlush(product);
    return product;
};
exports.createProduct = createProduct;
// if (total_space > fridge.capacity) {
//     throw new BadRequest("OverCapacity", "Capacity of the fridge has been exceeded")
// }
