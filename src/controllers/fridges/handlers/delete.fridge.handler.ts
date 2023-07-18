import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";


export const deleteFridge = async (fridgeId: string, search: string) => {
    const em = RequestContext.getEntityManager();
    const products = await em.find(Product, {fridge: fridgeId, user: search});
    products.forEach(async product => {
        await em.removeAndFlush(product)
    });
};