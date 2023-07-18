import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductDeleteBody, ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { Unauthorized } from "@panenco/papi";


export const deleteProduct = async (productId: string) => {
    const em = RequestContext.getEntityManager();
    const product = await em.findOneOrFail(Product, productId);
    await em.removeAndFlush(product);
};