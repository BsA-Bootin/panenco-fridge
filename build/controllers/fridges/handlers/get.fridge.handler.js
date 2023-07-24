"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFridge = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const getFridge = async (fridgeId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const products = await em.find(product_entity_1.Product, { fridgeProducts: { fridge: fridgeId, user: body.userId } });
    return products;
};
exports.getFridge = getFridge;
//# sourceMappingURL=get.fridge.handler.js.map