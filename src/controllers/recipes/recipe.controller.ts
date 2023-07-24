import { UserGiftBody } from '../../contracts/user.body';
import { Delete, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { ArrayRepresenter, Body, Query, Representer, StatusCode } from '@panenco/papi';
import { UserView } from '../../contracts/user.view';
import { OpenAPI } from 'routing-controllers-openapi';
import {ProductView } from '../../contracts/product.view';
import { SearchQuery } from '../../contracts/search.query';
import { RecipeCreateBody, RecipeIngredients, RecipeName } from '../../contracts/recipe.body';
import { createRecipe } from './handlers/create.recipe.handler';
import { RecipeExtraView, RecipeIdView, RecipeView } from '../../contracts/recipe.view';
import { deleteRecipe } from './handlers/delete.recipe.handler';
import { removeIngredientsRecipe } from './handlers/remove.ingredients.handler';
import { addIngredientsRecipe } from './handlers/add.ingredients.handler';
import { nameRecipe } from './handlers/name.recipe.handler';
import { getRecipe } from './handlers/get.recipe.handler';
import { getAllRecipes } from './handlers/get.allrecipes.handler';
import { getMissingIngredients } from './handlers/get.missingIngredients.handler';
import { IngredientView } from '../../contracts/ingredient.view';


@JsonController("/recipes")
export class RecipeController {

  @Get("/:id")
  @Representer(RecipeView, StatusCode.ok)
  @OpenAPI({ summary: 'Get specific recipe'})
  async getRecipe(@Param('id') recipeId: string) {
    return getRecipe(recipeId);
  }

  @Get("/user/:id")
  @ArrayRepresenter(RecipeExtraView, StatusCode.ok)
  @OpenAPI({ summary: 'Get all recipes'})
  async getAllRecipes(@Param('id') userId: string) {
    return getAllRecipes(userId);
  }

  @Get("/missing/:id")
  @ArrayRepresenter(IngredientView, StatusCode.ok)
  @OpenAPI({ summary: 'Get all products from Location'})
  async getNissingIngredients(@Param('id') recipeId: string) {
    return getMissingIngredients(recipeId);
  }

  @Post()
  @Representer(RecipeIdView, StatusCode.created)
  @OpenAPI({ summary: 'Create a new recipe'})
  async createRecipe(@Body() body: RecipeCreateBody) {
    return createRecipe(body);
  }

  @Patch("/add/:id")
  @Representer(RecipeView, StatusCode.ok)
  @OpenAPI({ summary: 'add ingredients to recipe'})
  async addIngredientsRecipe(@Body() body: RecipeIngredients, @Param('id') recipeId: string) {
    return addIngredientsRecipe(recipeId, body);
  }

  @Patch("/remove/:id")
  @Representer(RecipeView, StatusCode.ok)
  @OpenAPI({ summary: 'remove ingredients from recipe'})
  async removeIngredientsRecipe(@Body() body: RecipeIngredients, @Param('id') recipeId: string) {
    return removeIngredientsRecipe(recipeId, body);
  }

  @Patch("/name/:id")
  @Representer(RecipeView, StatusCode.ok)
  @OpenAPI({ summary: 'change recipe name'})
  async nameRecipe(@Body() body: RecipeName, @Param('id') recipeId: string) {
    return nameRecipe(recipeId, body);
  }

  @Delete('/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete a recipe'})
  async deleteAllProduct(@Param('id') recipeId: string) {
    return deleteRecipe(recipeId);
  }
}

