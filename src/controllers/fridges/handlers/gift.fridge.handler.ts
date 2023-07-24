import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { SearchQuery } from "../../../contracts/search.query";
import { FridgeGiftBody } from "../../../contracts/fridge.body";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const giftFridge = async (fridgeId: string, body: FridgeGiftBody) => {
    const em = RequestContext.getEntityManager();
    const fridgeProducts = await em.find(FridgeProduct, {user: body.sender, fridge: fridgeId});
    const user = await em.findOneOrFail(User, body.receiver);
    fridgeProducts.forEach(async fridgeProduct => {
        wrap(fridgeProduct).assign({user: user})
    });
    await em.flush();
};