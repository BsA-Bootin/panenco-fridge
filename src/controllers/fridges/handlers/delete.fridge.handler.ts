import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const deleteFridge = async (fridgeId: string, userId: string) => {
    const em = RequestContext.getEntityManager();
    const fridgeProducts = await em.find(FridgeProduct, {fridge: fridgeId, user: userId});
    fridgeProducts.forEach(async product => {
        await em.removeAndFlush(product)
    });
};