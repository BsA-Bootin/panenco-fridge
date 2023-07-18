import { createProduct } from './handlers/create.product.handler';
import { Delete, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { Body, Representer, StatusCode } from '@panenco/papi';
import { UserView } from '../../contracts/user.view';
import { OpenAPI } from 'routing-controllers-openapi';
import { ProductAddBody, ProductDeleteBody, ProductGiftBody } from '../../contracts/product.body';
import { ProductCreateView, ProductView } from '../../contracts/product.view';
import { giftProduct } from './handlers/gift.product.handler';
import { deleteProduct } from './handlers/delete.product.handler';
import { getProduct } from './handlers/get.product.handler';

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

  @Patch("/gift/:id")
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'gift product to different user'})
  async giftProduct(@Body() body: ProductGiftBody, @Param('id') productId: string) {
    return giftProduct(productId, body);
  }

  @Delete('/:id')
  @Representer(null, StatusCode.ok)
  @OpenAPI({ summary: 'delete product given id'})
  async deleteProduct(@Param('id') productId: string) {
    return deleteProduct(productId);
  }
}