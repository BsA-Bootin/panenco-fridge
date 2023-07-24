"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeIngredientsRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const papi_1 = require("@panenco/papi");
const ingredients_entity_1 = require("../../../entities/ingredients.entity");
const removeIngredientsRecipe = async (recipeId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    body.products.forEach(async (product) => {
        if (await em.count(product_entity_1.Product, product.productId) === 0) {
            throw new papi_1.BadRequest('NoEntityFound', 'Product does not exist');
        }
    });
    body.products.forEach(async (product) => {
        const ingredient = em.findOneOrFail(ingredients_entity_1.Ingredient, { recipe: recipeId, product: product.productId });
        em.removeAndFlush(ingredient);
    });
    return em.find(ingredients_entity_1.Ingredient, { recipe: recipeId });
};
exports.removeIngredientsRecipe = removeIngredientsRecipe;
//# sourceMappingURL=remove.ingredients.handler.js.map