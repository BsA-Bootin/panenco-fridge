import { Unauthorized, createAccessToken } from "@panenco/papi"
import { LoginBody } from "../../../contracts/login.body"
import { RequestContext } from "@mikro-orm/core"
import { User } from "../../../entities/user.entity"
import { MyToken } from "../../../contracts/admin.requirements/token.type"

export const login = async (body: LoginBody) => {
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, {email: body.email})
    if (user.attempts >= 3) {
        throw new Unauthorized('TooManyTries', 'Too many tries');
    }
    if (body.password !== user.password) {
        user.assign({attempts: user.attempts + 1});
        await em.flush();
        throw new Unauthorized('IncorrectPassword', 'Password is incorrect');
    }
    const token = await createAccessToken('jwtSecretFromConfigHere' , 600, {userId: user.id, role: user.role} as MyToken);
    return token;
}