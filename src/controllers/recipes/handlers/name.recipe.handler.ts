import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients, RecipeName } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";
import { BadRequest } from "@panenco/papi";

export const nameRecipe = async (recipeId: string, body: RecipeName) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId);
    if ((await em.find(Recipe, {name: body.name, user: recipe.user})).length !== 0) {
        throw new BadRequest("NotUniqueName", "Recipe name already exists")
    }
    recipe.assign({name: body.name});
    await em.flush();
    return recipe;
};