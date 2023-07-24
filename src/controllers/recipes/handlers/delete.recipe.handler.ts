import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";
import { Recipe } from "../../../entities/recipe.entity";
import { Ingredient } from "../../../entities/ingredients.entity";


export const deleteRecipe = async (recipeId: string) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId);
    const ingredients = await em.find(Ingredient, {recipe: recipeId})
    await em.removeAndFlush(ingredients);
    await em.removeAndFlush(recipe);
};