"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putFridgeProduct = void 0;
const core_1 = require("@mikro-orm/core");
const fridge_entity_1 = require("../../../entities/fridge.entity");
const fridgeProduct_entity_1 = require("../../../entities/fridgeProduct.entity");
const putFridgeProduct = async (productId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const qb = em.createQueryBuilder(fridge_entity_1.Fridge, 'f')
        .select(['sum(p.size) as sum'])
        .join('f.fridgeProducts', 'fp')
        .join('fp.product', 'p')
        .where({ 'f.id': body.fridgeId });
    console.log(await qb.getResult());
    const productFridgeBody = {
        product: productId,
        fridge: body.fridgeId,
        user: body.userId,
    };
    const fridgeProduct = em.create(fridgeProduct_entity_1.FridgeProduct, productFridgeBody);
    await em.persistAndFlush(fridgeProduct);
    return fridgeProduct;
};
exports.putFridgeProduct = putFridgeProduct;
//# sourceMappingURL=put.fridgeProduct.handler.js.map