"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const papi_1 = require("@panenco/papi");
const createRecipe = async (body) => {
    const em = core_1.RequestContext.getEntityManager();
    if ((await em.count(recipe_entity_1.Recipe, { name: body.name, user: body.user })) !== 0) {
        throw new papi_1.BadRequest("NotUniqueName", "Recipe name already exists");
    }
    const recipe = em.create(recipe_entity_1.Recipe, body);
    await em.persistAndFlush(recipe);
    return recipe;
};
exports.createRecipe = createRecipe;
