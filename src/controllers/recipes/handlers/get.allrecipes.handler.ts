import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { Recipe } from "../../../entities/recipe.entity";


export const getAllRecipes = async (userId: string) => {
    const em = RequestContext.getEntityManager();
    const recipes = await em.findOneOrFail(User, userId);
    await recipes.recipes.init();
    return recipes.recipes.getItems();
};