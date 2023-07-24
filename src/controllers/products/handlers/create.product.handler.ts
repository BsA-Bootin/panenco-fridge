import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity";
import { ProductAddBody } from "../../../contracts/product.body";
import { Fridge } from "../../../entities/fridge.entity";
import { BadRequest } from "@panenco/papi";

export const createProduct = async (body: ProductAddBody) => {
    const em = RequestContext.getEntityManager();
    const product = em.create(Product, body);
    await em.persistAndFlush(product);
    return product;
};


// if (total_space > fridge.capacity) {
//     throw new BadRequest("OverCapacity", "Capacity of the fridge has been exceeded")
// }