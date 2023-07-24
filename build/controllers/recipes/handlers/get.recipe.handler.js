"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const getRecipe = async (recipeId) => {
    const em = core_1.RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(recipe_entity_1.Recipe, recipeId);
    return recipe;
};
exports.getRecipe = getRecipe;
//# sourceMappingURL=get.recipe.handler.js.map