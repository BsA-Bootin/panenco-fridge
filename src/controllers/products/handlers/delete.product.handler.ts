import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";
import { Ingredient } from "../../../entities/ingredients.entity";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const deleteProduct = async (productId: string) => {
    const em = RequestContext.getEntityManager();
    const product = await em.findOneOrFail(Product, productId);
    const ingredients = await em.find(Ingredient, {product: productId});
    const fridgeProducts = await em.find(FridgeProduct, {product: productId});
    await em.removeAndFlush(product);
    await em.removeAndFlush(ingredients);
    await em.removeAndFlush(fridgeProducts);
};