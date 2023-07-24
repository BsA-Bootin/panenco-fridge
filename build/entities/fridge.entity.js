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
exports.Fridge = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let Fridge = exports.Fridge = class Fridge extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid_1.v4)();
        this.fridgeProducts = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ columnType: 'uuid' }),
    __metadata("design:type", String)
], Fridge.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Fridge.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Fridge.prototype, "capacity", void 0);
__decorate([
    (0, core_1.OneToMany)('FridgeProduct', 'fridge'),
    __metadata("design:type", Object)
], Fridge.prototype, "fridgeProducts", void 0);
exports.Fridge = Fridge = __decorate([
    (0, core_1.Entity)()
], Fridge);
//# sourceMappingURL=fridge.entity.js.map