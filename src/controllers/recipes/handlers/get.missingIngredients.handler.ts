import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients, RecipeName } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";
import { BadRequest } from "@panenco/papi";
import { User } from "../../../entities/user.entity";
import { Ingredient } from "../../../entities/ingredients.entity";
import { Product } from "../../../entities/product.entity";
import { EntityManager } from "@mikro-orm/postgresql";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";

export const getMissingIngredients = async (recipeId: string) => {
    const em = RequestContext.getEntityManager() as EntityManager;
    const recipe = await em.findOneOrFail(Recipe, recipeId, {populate: ['user.fridgeProducts']});

    const qbsub = em.createQueryBuilder(FridgeProduct, 'fp')
    .select('fp.product')
    .where({'fp.user': recipe.user})
 
    const qb = em.createQueryBuilder(Product, 'p')
    .join('p.ingredients', 'i')
    .where({'i.recipe': recipeId})

    const qbdebug = qb.andWhere({ 'i.product': {$nin: qbsub.getKnexQuery()}})

    const result = await qbdebug.execute()

    const resultIds = result.map((x: {id, name, size}) => x.id)
    return await em.find(Product, resultIds)
};