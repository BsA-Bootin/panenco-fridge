import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity";
import { ProductAddBody } from "../../../contracts/product.body";
import { Fridge } from "../../../entities/fridge.entity";
import { BadRequest } from "@panenco/papi";

export const createProduct = async (body: ProductAddBody) => {
    const em = RequestContext.getEntityManager();
    const fridge = await em.findOneOrFail(Fridge, body.fridge);
    let total_space = body.size;
    await fridge.products.init();
    fridge.products.getItems().forEach(element => {
        total_space += element.size;
    });
    if (total_space > fridge.capacity) {
        throw new BadRequest("OverCapacity", "Capacity of the fridge has been exceeded")
    }
    const product = em.create(Product, body);
    await em.persistAndFlush(product);
    return product;
};