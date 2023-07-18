import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { Fridge } from "../../../entities/fridge.entity";

export const getProductsLocation = async (userId: string, location: string) => {
    const em = RequestContext.getEntityManager();
    const fridgeIds = []
    const fridges = await em.find(Fridge, { location: Number(location) });
    fridges.map(fridge => fridgeIds.push(fridge.id));
    return await em.find(Product, {user: userId, fridge: fridgeIds})
};