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
exports.FridgeController = void 0;
const create_fridge_handler_1 = require("./handlers/create.fridge.handler");
const routing_controllers_1 = require("routing-controllers");
const papi_1 = require("@panenco/papi");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const fridge_body_1 = require("../../contracts/fridge.body");
const fridge_view_1 = require("../../contracts/fridge.view");
const product_view_1 = require("../../contracts/product.view");
const get_fridge_handler_1 = require("./handlers/get.fridge.handler");
const search_query_1 = require("../../contracts/search.query");
const gift_fridge_handler_1 = require("./handlers/gift.fridge.handler");
const delete_fridge_handler_1 = require("./handlers/delete.fridge.handler");
let FridgeController = exports.FridgeController = class FridgeController {
    async getFridge(fridgeId, body) {
        return (0, get_fridge_handler_1.getFridge)(fridgeId, body);
    }
    async createFridge(body) {
        return (0, create_fridge_handler_1.createFridge)(body);
    }
    async giftFridge(body, fridgeId) {
        return (0, gift_fridge_handler_1.giftFridge)(fridgeId, body);
    }
    async deleteProduct(fridgeId, query) {
        return (0, delete_fridge_handler_1.deleteFridge)(fridgeId, query.userId);
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, papi_1.ArrayRepresenter)(product_view_1.ProductView, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Get all products from fridge' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, papi_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fridge_body_1.FridgeGetBody]),
    __metadata("design:returntype", Promise)
], FridgeController.prototype, "getFridge", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, papi_1.Representer)(fridge_view_1.CreateFridgeView, papi_1.StatusCode.created),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Create a new Fridge' }),
    __param(0, (0, papi_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fridge_body_1.FridgeBody]),
    __metadata("design:returntype", Promise)
], FridgeController.prototype, "createFridge", null);
__decorate([
    (0, routing_controllers_1.Patch)("/gift/:id"),
    (0, papi_1.Representer)(null, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'gift fridge to different user' }),
    __param(0, (0, papi_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fridge_body_1.FridgeGiftBody, String]),
    __metadata("design:returntype", Promise)
], FridgeController.prototype, "giftFridge", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, papi_1.Representer)(null, papi_1.StatusCode.ok),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'delete products from a fridge' }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, papi_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, search_query_1.SearchQuery]),
    __metadata("design:returntype", Promise)
], FridgeController.prototype, "deleteProduct", null);
exports.FridgeController = FridgeController = __decorate([
    (0, routing_controllers_1.JsonController)("/fridges")
], FridgeController);
