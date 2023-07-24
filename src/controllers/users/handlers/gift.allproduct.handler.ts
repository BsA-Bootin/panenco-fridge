import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { SearchQuery } from "../../../contracts/search.query";
import { FridgeGiftBody } from "../../../contracts/fridge.body";
import { UserGiftBody } from "../../../contracts/user.body";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const giftAllProducts = async (userId: string, body: UserGiftBody) => {
    const em = RequestContext.getEntityManager();
    const receiver = await em.findOneOrFail(User, body.receiver);
    const user = await em.findOneOrFail(User, userId, {populate: ['fridgeProducts']});
    user.fridgeProducts.getItems().forEach(async product => {
        wrap(product).assign({user: receiver})
    });
    await em.flush();
};