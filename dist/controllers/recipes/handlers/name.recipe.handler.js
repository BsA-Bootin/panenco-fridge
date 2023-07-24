"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const papi_1 = require("@panenco/papi");
const nameRecipe = async (recipeId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(recipe_entity_1.Recipe, recipeId);
    if ((await em.find(recipe_entity_1.Recipe, { name: body.name, user: recipe.user })).length !== 0) {
        throw new papi_1.BadRequest("NotUniqueName", "Recipe name already exists");
    }
    recipe.assign({ name: body.name });
    await em.flush();
    return recipe;
};
exports.nameRecipe = nameRecipe;
