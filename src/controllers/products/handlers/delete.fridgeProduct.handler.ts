import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";
import { Ingredient } from "../../../entities/ingredients.entity";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const deleteFridgeProduct = async (productId: string, fridgeId: string, userId: string) => {
    const em = RequestContext.getEntityManager();
    const fridgeProduct = await em.findOneOrFail(FridgeProduct, {product: productId, fridge: fridgeId, user: userId});
    await em.removeAndFlush(fridgeProduct);
};