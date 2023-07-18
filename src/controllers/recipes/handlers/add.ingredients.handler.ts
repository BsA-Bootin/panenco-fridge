import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";

export const addIngredientsRecipe = async (recipeId: string, body: RecipeIngredients) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId);
    const ingredientsToAdd = body.ingredients.filter(ingredient => !recipe.ingredients.includes(ingredient))
    const ingredients = recipe.ingredients.concat(ingredientsToAdd);
    recipe.assign({ingredients: ingredients});
    await em.flush();
    return recipe;
};