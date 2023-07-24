"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const orm_config_1 = __importDefault(require("./orm.config"));
core_1.MikroORM.init(orm_config_1.default).then(async (orm) => {
    const migrator = orm.getMigrator();
    const test = await migrator.createMigration();
    await migrator.up();
});
//# sourceMappingURL=create.migration.js.map