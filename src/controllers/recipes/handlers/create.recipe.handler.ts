import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";
import { BadRequest } from "@panenco/papi";

export const createRecipe = async (body: RecipeCreateBody) => {
    const em = RequestContext.getEntityManager();
    if ((await em.find(Recipe, {name: body.name, user: body.user})).length !== 0) {
        throw new BadRequest("NotUniqueName", "Recipe name already exists")
    }
    const recipe = em.create(Recipe, body);
    await em.persistAndFlush(recipe);
    return recipe;
};