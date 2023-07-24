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
exports.UserController = void 0;
const create_user_handler_1 = require("./handlers/create.user.handler");
const user_body_1 = require("../../contracts/user.body");
const routing_controllers_1 = require("routing-controllers");
const papi_1 = require("@panenco/papi");
const user_view_1 = require("../../contracts/user.view");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const product_view_1 = require("../../contracts/product.view");
const get_allproduct_handler_1 = require("./handlers/get.allproduct.handler");
const gift_allproduct_handler_1 = require("./handlers/gift.allproduct.handler");
const search_query_1 = require("../../contracts/search.query");
const delete_allproduct_handler_1 = require("./handlers/delete.allproduct.handler");
const get_productsLocation_handler_1 = require("./handlers/get.productsLocation.handler");
let UserController = exports.UserController = class UserController {
    async getAllProducts(userId) {
        return (0, get_allproduct_handler_1.getAllProducts)(userId);
    }
    async getProductsLocation(userId, query) {
        return (0, get_productsLocation_handler_1.getProductsLocation)(userId, query.search);
    }
    async createUser(body) {
        return (0, create_user_handler_1.createUser)(body);
    }
    async giftAllProducts(body, userId) {
        return (0, gift_allproduct_handler_1.giftAllProducts)(userId, body);
    }
    async deleteAllProduct(userId) {
        return (0, delete_allproduct_handler_1.deleteAllProducts)(userId);
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, papi_1.ArrayRepresenter)(product_view_1.ProductView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get all products from User' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllProducts", null);
__decorate([
    (0, routing_controllers_1.Get)("/location/:id"),
    (0, papi_1.ArrayRepresenter)(product_view_1.ProductView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get all products from Location' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, papi_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, search_query_1.SearchQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProductsLocation", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, papi_1.Representer)(user_view_1.UserView, papi_1.StatusCode.created),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Create a new user' }),
    __param(0, (0, papi_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_body_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, routing_controllers_1.Patch)("/gift/:id"),
    (0, papi_1.Representer)(null, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'gift all products to different user' }),
    __param(0, (0, papi_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_body_1.UserGiftBody, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "giftAllProducts", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, papi_1.Representer)(null, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'delete all products from a user' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAllProduct", null);
exports.UserController = UserController = __decorate([
    (0, routing_controllers_1.JsonController)("/users")
], UserController);
