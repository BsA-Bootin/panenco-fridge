import { RequestContext } from "@mikro-orm/core";
import { User } from "../../../entities/user.entity";

export const deleteAllProducts = async (userId: string) => {
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, userId);
    await user.products.init();
    user.products.getItems().forEach(async product => {
        await em.removeAndFlush(product)
    });
};