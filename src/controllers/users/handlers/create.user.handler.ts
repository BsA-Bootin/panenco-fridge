import { UserBody } from "../../../contracts/user.body";
import { RequestContext } from "@mikro-orm/core";
import { User } from "../../../entities/user.entity";
import { BadRequest } from "@panenco/papi";

export const createUser = async (body: UserBody) => {
    const em = RequestContext.getEntityManager();
    if ((await em.find(User, {email: body.email})).length !== 0) {
        throw new BadRequest("NotUniqueEmail", "User email already exists")
    }
    const user = em.create(User, body);
    await em.persistAndFlush(user);
    return user;
};