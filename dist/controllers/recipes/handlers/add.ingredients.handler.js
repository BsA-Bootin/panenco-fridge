"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIngredientsRecipe = void 0;
const core_1 = require("@mikro-orm/core");
const product_entity_1 = require("../../../entities/product.entity");
const papi_1 = require("@panenco/papi");
const ingredients_entity_1 = require("../../../entities/ingredients.entity");
const addIngredientsRecipe = async (recipeId, body) => {
    const em = core_1.RequestContext.getEntityManager();
    body.products.forEach(async (product) => {
        if (await em.count(product_entity_1.Product, product.productId) === 0) {
            throw new papi_1.BadRequest('NoEntityFound', 'Product does not exist');
        }
    });
    let ingredientFlush = [];
    body.products.forEach(async (product) => {
        const ingredientBody = {
            recipe: recipeId,
            product: product.productId,
            amount: product.amount,
        };
        ingredientFlush.push(em.create(ingredients_entity_1.Ingredient, ingredientBody));
    });
    await em.persistAndFlush(ingredientFlush);
    return em.find(ingredients_entity_1.Ingredient, { recipe: recipeId });
};
exports.addIngredientsRecipe = addIngredientsRecipe;
