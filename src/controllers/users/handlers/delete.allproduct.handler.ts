import { RequestContext } from "@mikro-orm/core";
import { User } from "../../../entities/user.entity";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";

export const deleteAllProducts = async (userId: string) => {
    const em = RequestContext.getEntityManager();
    const fridgeProducts = await em.find(FridgeProduct, {user: userId})
    fridgeProducts.forEach(async product => {
        await em.removeAndFlush(product)
    });
};