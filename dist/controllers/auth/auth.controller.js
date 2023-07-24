"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const papi_1 = require("@panenco/papi");
const routing_controllers_1 = require("routing-controllers");
const access_token_view_1 = require("../../contracts/access.token.view");
const login_body_1 = require("../../contracts/login.body");
const login_handler_1 = require("./handlers/login.handler");
let AuthController = exports.AuthController = class AuthController {
    async login(body) {
        return (0, login_handler_1.login)(body);
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/tokens'),
    (0, papi_1.Representer)(access_token_view_1.AccessTokenView),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_body_1.LoginBody]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, routing_controllers_1.JsonController)("/auth")
], AuthController);
