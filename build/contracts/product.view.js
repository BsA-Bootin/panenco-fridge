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
exports.ProductCreateView = exports.ProductView = void 0;
const class_transformer_1 = require("class-transformer");
let ProductView = exports.ProductView = class ProductView {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductView.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductView.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductView.prototype, "size", void 0);
exports.ProductView = ProductView = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductView);
let ProductCreateView = exports.ProductCreateView = class ProductCreateView {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductCreateView.prototype, "id", void 0);
exports.ProductCreateView = ProductCreateView = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductCreateView);
//# sourceMappingURL=product.view.js.map