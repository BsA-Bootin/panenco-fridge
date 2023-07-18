import { RequestContext, wrap } from "@mikro-orm/core";
import { ProductGiftBody } from "../../../contracts/product.body";
import { Product } from "../../../entities/product.entity";
import { User } from "../../../entities/user.entity";
import { FridgeGetBody } from "../../../contracts/fridge.body";
import { Fridge } from "../../../entities/fridge.entity";
import { findSourceMap } from "module";


export const getFridge = async (fridgeId: string, body: FridgeGetBody) => {
    const em = RequestContext.getEntityManager();
    const products = await em.find(Product, {fridge: fridgeId, user: body.userId});
    return products;
};