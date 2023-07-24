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
exports.ProductDeleteBody = exports.ProductGiftBody = exports.FridgeProductAddBody = exports.ProductAddBody = void 0;
const class_validator_1 = require("class-validator");
class ProductAddBody {
}
exports.ProductAddBody = ProductAddBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductAddBody.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductAddBody.prototype, "size", void 0);
class FridgeProductAddBody {
}
exports.FridgeProductAddBody = FridgeProductAddBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FridgeProductAddBody.prototype, "fridgeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FridgeProductAddBody.prototype, "userId", void 0);
class ProductGiftBody {
}
exports.ProductGiftBody = ProductGiftBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductGiftBody.prototype, "receiver", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductGiftBody.prototype, "sender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductGiftBody.prototype, "fridgeId", void 0);
class ProductDeleteBody {
}
exports.ProductDeleteBody = ProductDeleteBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDeleteBody.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDeleteBody.prototype, "userId", void 0);
//# sourceMappingURL=product.body.js.map