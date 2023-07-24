import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { FridgeGetBody } from "../../../contracts/fridge.body";
import { Fridge } from "../../../entities/fridge.entity";
import { findSourceMap } from "module";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";


export const getFridge = async (fridgeId: string, body: FridgeGetBody) => {
    const em = RequestContext.getEntityManager();
    const products = await em.find(Product, {fridgeProducts: {fridge: fridgeId, user: body.userId}});
    return products;
};