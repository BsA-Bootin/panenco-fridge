import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";

export const removeIngredientsRecipe = async (recipeId: string, body: RecipeIngredients) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId);
    const ingredients = recipe.ingredients.filter(ingredient => !body.ingredients.includes(ingredient));
    recipe.assign({ingredients: ingredients});
    await em.flush();
    return recipe;
};