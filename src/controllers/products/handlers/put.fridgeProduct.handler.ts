import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity";
import { FridgeProductAddBody, ProductAddBody } from "../../../contracts/product.body";
import { Fridge } from "../../../entities/fridge.entity";
import { BadRequest } from "@panenco/papi";
import { FridgeProduct } from "../../../entities/fridgeProduct.entity";
import { EntityManager } from "@mikro-orm/postgresql";

export const putFridgeProduct = async (productId, body: FridgeProductAddBody) => {
    const em = RequestContext.getEntityManager() as EntityManager;
    const product = await em.findOneOrFail(Product, productId);
    const fridge = await em.findOneOrFail(Fridge, body.fridgeId)

    const qbsum = em.createQueryBuilder(Fridge, 'f')
    .select(['SUM(p.size) as sum'])
    .join('f.fridgeProducts', 'fp')
    .join('fp.product', 'p')
    .where({'f.id': body.fridgeId});
    const newSum = await qbsum.execute<{sum: number}>();
    const total: number = Number(newSum[0].sum) + product.size;
    if (total > fridge.capacity) {
        throw new BadRequest('CapacityExceeded', 'Capacity of the fridge has been exceeded')
    }

    const productFridgeBody = {
        product: productId,
        fridge: body.fridgeId,
        user: body.userId,
    }
    const fridgeProduct = em.create(FridgeProduct, productFridgeBody);
    await em.persistAndFlush(fridgeProduct);
    return fridgeProduct;
};