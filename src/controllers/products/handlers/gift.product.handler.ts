import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const giftProduct = async (productId: string, body: ProductGiftBody) => {
    const em = RequestContext.getEntityManager();
    const fridgeProduct = await em.findOneOrFail(FridgeProduct, {product: productId, user: body.sender, fridge: body.fridgeId});
    wrap(fridgeProduct).assign({user: await em.findOneOrFail(User, body.receiver)});
    await em.flush();
};