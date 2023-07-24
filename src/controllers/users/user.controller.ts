import { createUser } from './handlers/create.user.handler';
import { UserBody, UserGiftBody } from '../../contracts/user.body';
import { Delete, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { ArrayRepresenter, Body, Query, Representer, StatusCode } from '@panenco/papi';
import { UserView } from '../../contracts/user.view';
import { OpenAPI } from 'routing-controllers-openapi';
import { ProductView } from '../../contracts/product.view';
import { getAllProducts } from './handlers/get.allproduct.handler';
import { giftAllProducts } from './handlers/gift.allproduct.handler';
import { SearchQuery } from '../../contracts/search.query';
import { deleteAllProducts } from './handlers/delete.allproduct.handler';
import { getProductsLocation } from './handlers/get.productsLocation.handler';

@JsonController("/users")
export class UserController {

  @Get("/:id")
  @ArrayRepresenter(ProductView, StatusCode.ok)
  @OpenAPI({ summary: 'Get all products from User'})
  async getAllProducts(@Param('id') userId: string) {
    return getAllProducts(userId);
  }

  @Get("/location/:id")
  @ArrayRepresenter(ProductView, StatusCode.ok)
  @OpenAPI({ summary: 'Get all products from Location'})
  async getProductsLocation(@Param('id') userId: string, @Query() query: SearchQuery) {
    return getProductsLocation(userId, query.search);
  }

  @Post()
  @Representer(UserView, StatusCode.created)
  @OpenAPI({ summary: 'Create a new user'})
  async createUser(@Body() body: UserBody) {
    return createUser(body);
  }

  @Patch("/gift/:id")
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'gift all products to different user'})
  async giftAllProducts(@Body() body: UserGiftBody, @Param('id') userId: string) {
    return giftAllProducts(userId, body);
  }

  @Delete('/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete all products from a user'})
  async deleteAllProduct(@Param('id') userId: string) {
    return deleteAllProducts(userId);
  }
}
