import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { Recipe } from "../../../entities/recipe.entity";


export const getRecipe = async (recipeId) => {
    const em = RequestContext.getEntityManager();
    const recipe = await em.findOneOrFail(Recipe, recipeId);
    return recipe;
};