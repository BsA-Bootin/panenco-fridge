import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const getAllProducts = async (userId: string) => {
    const em = RequestContext.getEntityManager();
    const products = await em.find(Product, {fridgeProducts: {user: userId}});
    return products;
};