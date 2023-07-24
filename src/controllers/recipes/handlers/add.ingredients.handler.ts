import { RequestContext } from "@mikro-orm/core";
import { RecipeCreateBody, RecipeIngredients } from "../../../contracts/recipe.body";
import { Recipe } from "../../../entities/recipe.entity";
import { Product } from "../../../entities/product.entity";
import { BadRequest } from "@panenco/papi";
import { Ingredient } from "../../../entities/ingredients.entity";

export const addIngredientsRecipe = async (recipeId: string, body: RecipeIngredients) => {
    const em = RequestContext.getEntityManager();
    body.products.forEach(async product => {
        if (await em.count(Product, product.productId) === 0) {
            throw new BadRequest('NoEntityFound', 'Product does not exist');
        }
    })
    let ingredientFlush = []
    body.products.forEach(async product => {
        const ingredientBody = {
            recipe: recipeId,
            product: product.productId,
            amount: product.amount,
        };
        ingredientFlush.push(em.create(Ingredient, ingredientBody));
    })
    await em.persistAndFlush(ingredientFlush);

    return em.find(Ingredient, {recipe: recipeId});
};