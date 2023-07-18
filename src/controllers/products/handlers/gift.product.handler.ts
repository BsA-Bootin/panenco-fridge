import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";


export const giftProduct = async (productId: string, body: ProductGiftBody) => {
    const em = RequestContext.getEntityManager();
    const product = await em.findOneOrFail(Product, productId);
    product.assign({user: await em.findOneOrFail(User, body.receiver)});
    await em.flush();
};