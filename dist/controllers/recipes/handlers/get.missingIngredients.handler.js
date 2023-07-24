"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingIngredients = void 0;
const getMissingIngredients = async (recipeId) => {
    // const em = RequestContext.getEntityManager();
    // const recipe = await em.findOneOrFail(Recipe, recipeId, {populate: ['user.fridgeProducts']});
    // const recipeIngredientsIds = []
    // const recipeIngredients = recipe.ingredients.getItems()
    // recipeIngredients.forEach(ingredient => {
    //     recipeIngredientsIds.push(ingredient.product.id);
    // })
    // const userIngredientsIds = recipe.user.fridgeProducts.getItems().map((i ) => i.product.id)
    // const missingIngredients = recipeIngredientsIds.filter(ingredient => !userIngredientsIds.includes(ingredient));
    // return await em.find(Product, missingIngredients)
};
exports.getMissingIngredients = getMissingIngredients;
