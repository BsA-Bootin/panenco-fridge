import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { SearchQuery } from "../../../contracts/search.query";
import { FridgeGiftBody } from "../../../contracts/fridge.body";


export const giftFridge = async (fridgeId: string, body: FridgeGiftBody) => {
    const em = RequestContext.getEntityManager();
    const products = await em.find(Product, {user: body.sender, fridge: fridgeId});
    const user = await em.findOneOrFail(User, body.receiver);
    products.forEach(async product => {
        product.assign({user: user})
    });
    await em.flush();
};