import { createFridge } from './handlers/create.fridge.handler';
import { Authorized, Delete, Get, JsonController, Param, Patch, Post, Req } from 'routing-controllers';
import { ArrayRepresenter, Body, ListRepresenter, Query, Representer, StatusCode } from '@panenco/papi';
import { OpenAPI } from 'routing-controllers-openapi';
import { FridgeBody, FridgeGetBody, FridgeGiftBody } from '../../contracts/fridge.body';
import { CreateFridgeView } from '../../contracts/fridge.view';
import { ProductView } from '../../contracts/product.view';
import { getFridge } from './handlers/get.fridge.handler';
import { SearchQuery } from '../../contracts/search.query';
import { giftFridge } from './handlers/gift.fridge.handler';
import { deleteFridge } from './handlers/delete.fridge.handler';
import { Request } from 'express';
import { adminRequirement } from '../../contracts/admin.requirements/admin.requirement';

@JsonController("/fridges")

export class FridgeController {

  @Get("/:id")
  @ArrayRepresenter(ProductView, StatusCode.ok)
  @OpenAPI({ summary: 'Get all products from fridge'})
  @Authorized()
  async getFridge(@Param('id') fridgeId: string, @Body() body: FridgeGetBody) {
    return getFridge(fridgeId, body);
  }

  @Post()
  @Representer(CreateFridgeView, StatusCode.created)
  @OpenAPI({ summary: 'Create a new Fridge'})
  @Authorized(adminRequirement)
  async createFridge(@Body() body: FridgeBody) {
    return createFridge(body);
  }

  @Patch("/gift/:id")
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'gift fridge to different user'})
  async giftFridge(@Body() body: FridgeGiftBody, @Param('id') fridgeId: string) {
  return giftFridge(fridgeId, body);
  }

  @Delete('/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete products from a fridge'})
  async deleteProduct(@Param('id') fridgeId: string, @Query() query: SearchQuery) {
    return deleteFridge(fridgeId, query.search);
  }
}