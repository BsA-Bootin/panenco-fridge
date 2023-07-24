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
exports.Ingredient = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const recipe_entity_1 = require("./recipe.entity");
const product_entity_1 = require("./product.entity");
let Ingredient = exports.Ingredient = class Ingredient {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ columnType: 'uuid' }),
    __metadata("design:type", String)
], Ingredient.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Ingredient.prototype, "amount", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", recipe_entity_1.Recipe)
], Ingredient.prototype, "recipe", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", product_entity_1.Product)
], Ingredient.prototype, "product", void 0);
exports.Ingredient = Ingredient = __decorate([
    (0, core_1.Entity)()
], Ingredient);
//# sourceMappingURL=ingredients.entity.js.map