import { createProduct } from './handlers/create.product.handler';
import { Delete, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { Body, Query, Representer, StatusCode } from '@panenco/papi';
import { UserView } from '../../contracts/user.view';
import { OpenAPI } from 'routing-controllers-openapi';
import { FridgeProductAddBody, ProductAddBody, ProductDeleteBody, ProductGiftBody } from '../../contracts/product.body';
import { ProductCreateView, ProductView } from '../../contracts/product.view';
import { deleteProduct } from './handlers/delete.product.handler';
import { getProduct } from './handlers/get.product.handler';
import { getFridge } from '../fridges/handlers/get.fridge.handler';
import { FridgeProductView } from '../../contracts/fridgeproduct.view';
import { putFridgeProduct } from './handlers/put.fridgeProduct.handler';
import { deleteFridgeProduct } from './handlers/delete.fridgeProduct.handler';
import { giftProduct } from './handlers/gift.product.handler';
import { SearchQuery } from '../../contracts/search.query';

@JsonController("/products")
export class ProductController {

  @Get('/:id')
  @Representer(ProductView, StatusCode.ok)
  @OpenAPI({ summary: 'Get product details'})
  async getProduct(@Param('id') productId: string) {
    return getProduct(productId);
  }

  @Post()
  @Representer(ProductCreateView, StatusCode.created)
  @OpenAPI({ summary: 'Create a new product'})
  async createProduct(@Body() body: ProductAddBody) {
    return createProduct(body);
  }

  @Post("/putInFridge/:id")
  @Representer(FridgeProductView, StatusCode.created)
  @OpenAPI({ summary: 'Put a new product in a fridge'})
  async putFridgeProduct(@Body() body: FridgeProductAddBody, @Param('id') productId: string) {
    return putFridgeProduct(productId, body);
  }

  @Patch("/gift/:id")
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'gift product to different user'})
  async giftProduct(@Param('id') productId: string, @Body() body: ProductGiftBody) {
    return giftProduct(productId, body);
  }

  @Delete('/removeFromFridge/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete product in a fridge'})
  async deleteFridgeProduct(@Param('id') productId: string, @Query() query: SearchQuery) {
    return deleteFridgeProduct(productId, query.fridgeId, query.userId);
  }

  @Delete('/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete product given id'})
  async deleteProduct(@Param('id') productId: string) {
    return deleteProduct(productId);
  }
}