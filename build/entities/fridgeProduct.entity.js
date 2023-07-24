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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FridgeProduct = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("./user.entity");
const uuid_1 = require("uuid");
const fridge_entity_1 = require("./fridge.entity");
const product_entity_1 = require("./product.entity");
let FridgeProduct = exports.FridgeProduct = class FridgeProduct {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ columnType: 'uuid' }),
    __metadata("design:type", String)
], FridgeProduct.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", product_entity_1.Product)
], FridgeProduct.prototype, "product", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", fridge_entity_1.Fridge)
], FridgeProduct.prototype, "fridge", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", user_entity_1.User)
], FridgeProduct.prototype, "user", void 0);
exports.FridgeProduct = FridgeProduct = __decorate([
    (0, core_1.Entity)()
], FridgeProduct);
//# sourceMappingURL=fridgeProduct.entity.js.map