import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity";
import { Fridge } from "../../../entities/fridge.entity";
import { FridgeBody } from "../../../contracts/fridge.body";

export const createFridge = async (body: FridgeBody) => {
    const em = RequestContext.getEntityManager();
    const fridge = em.create(Fridge, body);
    await em.persistAndFlush(fridge);
    return fridge;
};