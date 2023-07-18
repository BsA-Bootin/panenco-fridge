import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";


export const getAllProducts = async (userId: string) => {
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, userId);
    await user.products.init();
    return user.products.getItems();
};