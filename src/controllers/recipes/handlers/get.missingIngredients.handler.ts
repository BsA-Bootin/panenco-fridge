import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients, RecipeName } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";
import { BadRequest } from "@panenco/papi";
import { User } from "../../../entities/user.entity";

export const getMissingIngredients = async (recipeId: string) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId, {populate: ["user.products"]});
    const currentProducts = recipe.user.products.getItems();
    const currentIngredients = currentProducts.map(product => product.name);
    const missingIngredients = recipe.ingredients.filter(ingredient => !currentIngredients.includes(ingredient));
    return missingIngredients;
};