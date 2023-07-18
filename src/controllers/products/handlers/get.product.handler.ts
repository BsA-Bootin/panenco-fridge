import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";


export const getProduct = async (productId) => {
    const em = RequestContext.getEntityManager();
    const product = await em.findOneOrFail(Product, productId);
    return product
};