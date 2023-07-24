"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRecipes = void 0;
const core_1 = require("@mikro-orm/core");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const getAllRecipes = async (userId) => {
    const em = core_1.RequestContext.getEntityManager();
    const recipes = await em.find(recipe_entity_1.Recipe, { user: userId });
    return recipes;
};
exports.getAllRecipes = getAllRecipes;
