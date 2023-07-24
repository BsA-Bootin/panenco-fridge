"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFridge = void 0;
const core_1 = require("@mikro-orm/core");
const fridge_entity_1 = require("../../../entities/fridge.entity");
const createFridge = async (body) => {
    const em = core_1.RequestContext.getEntityManager();
    const fridge = em.create(fridge_entity_1.Fridge, body);
    await em.persistAndFlush(fridge);
    return fridge;
};
exports.createFridge = createFridge;
//# sourceMappingURL=create.fridge.handler.js.map