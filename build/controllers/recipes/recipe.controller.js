"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const routing_controllers_1 = require("routing-controllers");
const papi_1 = require("@panenco/papi");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const recipe_body_1 = require("../../contracts/recipe.body");
const create_recipe_handler_1 = require("./handlers/create.recipe.handler");
const recipe_view_1 = require("../../contracts/recipe.view");
const delete_recipe_handler_1 = require("./handlers/delete.recipe.handler");
const remove_ingredients_handler_1 = require("./handlers/remove.ingredients.handler");
const add_ingredients_handler_1 = require("./handlers/add.ingredients.handler");
const name_recipe_handler_1 = require("./handlers/name.recipe.handler");
const get_recipe_handler_1 = require("./handlers/get.recipe.handler");
const get_allrecipes_handler_1 = require("./handlers/get.allrecipes.handler");
const get_missingIngredients_handler_1 = require("./handlers/get.missingIngredients.handler");
const ingredient_view_1 = require("../../contracts/ingredient.view");
let RecipeController = exports.RecipeController = class RecipeController {
    async getRecipe(recipeId) {
        return (0, get_recipe_handler_1.getRecipe)(recipeId);
    }
    async getAllRecipes(userId) {
        return (0, get_allrecipes_handler_1.getAllRecipes)(userId);
    }
    async getNissingIngredients(recipeId) {
        return (0, get_missingIngredients_handler_1.getMissingIngredients)(recipeId);
    }
    async createRecipe(body) {
        return (0, create_recipe_handler_1.createRecipe)(body);
    }
    async addIngredientsRecipe(body, recipeId) {
        return (0, add_ingredients_handler_1.addIngredientsRecipe)(recipeId, body);
    }
    async removeIngredientsRecipe(body, recipeId) {
        return (0, remove_ingredients_handler_1.removeIngredientsRecipe)(recipeId, body);
    }
    async nameRecipe(body, recipeId) {
        return (0, name_recipe_handler_1.nameRecipe)(recipeId, body);
    }
    async deleteAllProduct(recipeId) {
        return (0, delete_recipe_handler_1.deleteRecipe)(recipeId);
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, papi_1.Representer)(recipe_view_1.RecipeView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get specific recipe' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, routing_controllers_1.Get)("/user/:id"),
    (0, papi_1.ArrayRepresenter)(recipe_view_1.RecipeExtraView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get all recipes' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getAllRecipes", null);
__decorate([
    (0, routing_controllers_1.Get)("/missing/:id"),
    (0, papi_1.ArrayRepresenter)(ingredient_view_1.IngredientView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get all products from Location' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getNissingIngredients", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, papi_1.Representer)(recipe_view_1.RecipeIdView, papi_1.StatusCode.created),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Create a new recipe' }),
    __param(0, (0, papi_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_body_1.RecipeCreateBody]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
__decorate([
    (0, routing_controllers_1.Patch)("/add/:id"),
    (0, papi_1.Representer)(recipe_view_1.RecipeView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'add ingredients to recipe' }),
    __param(0, (0, papi_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_body_1.RecipeIngredients, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addIngredientsRecipe", null);
__decorate([
    (0, routing_controllers_1.Patch)("/remove/:id"),
    (0, papi_1.Representer)(recipe_view_1.RecipeView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'remove ingredients from recipe' }),
    __param(0, (0, papi_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_body_1.RecipeIngredients, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeIngredientsRecipe", null);
__decorate([
    (0, routing_controllers_1.Patch)("/name/:id"),
    (0, papi_1.Representer)(recipe_view_1.RecipeView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'change recipe name' }),
    __param(0, (0, papi_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_body_1.RecipeName, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "nameRecipe", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, papi_1.Representer)(null, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'delete a recipe' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "deleteAllProduct", null);
exports.RecipeController = RecipeController = __decorate([
    (0, routing_controllers_1.JsonController)("/recipes")
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map