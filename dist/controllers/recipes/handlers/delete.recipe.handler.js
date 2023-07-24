"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const ingredients_entity_1 = require("../../../entities/ingredients.entity");
const deleteRecipe = async (recipeId) => {
    const em = core_1.RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(recipe_entity_1.Recipe, recipeId);
    const ingredients = await em.find(ingredients_entity_1.Ingredient, { recipe: recipeId });
    await em.removeAndFlush(ingredients);
    await em.removeAndFlush(recipe);
};
exports.deleteRecipe = deleteRecipe;
