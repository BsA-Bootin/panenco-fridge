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
exports.RecipeName = exports.RecipeIngredients = exports.RecipeCreateBody = void 0;
const class_validator_1 = require("class-validator");
class RecipeCreateBody {
}
exports.RecipeCreateBody = RecipeCreateBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipeCreateBody.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipeCreateBody.prototype, "user", void 0);
class RecipeIngredients {
}
exports.RecipeIngredients = RecipeIngredients;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecipeIngredients.prototype, "products", void 0);
class RecipeName {
}
exports.RecipeName = RecipeName;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipeName.prototype, "name", void 0);
//# sourceMappingURL=recipe.body.js.map