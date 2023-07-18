import { Representer } from "@panenco/papi";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { AccessTokenView } from "../../contracts/access.token.view";
import { LoginBody } from "../../contracts/login.body";
import { login } from "./handlers/login.handler";


@JsonController("/auth")
export class AuthController {
    @Post('/tokens')
    @Representer(AccessTokenView)
    async login(@Body() body: LoginBody) {
        return login(body);
    }
}