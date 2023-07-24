"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const extensions_1 = require("./utils/extensions");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, 'migrations'),
        tableName: 'migrations',
        transactional: true,
        pattern: /^[\w-]+\d+\.(ts|js)$/,
        disableForeignKeys: false,
        emit: 'js',
    },
    type: 'postgresql',
    debug: true,
    tsNode: true,
    entities: [path_1.default.join(process.cwd(), '**', '*.entity.ts')],
    // entitiesTs: [path.join(process.cwd(), '**', '*.entity.ts')],
    user: 'root',
    password: 'root',
    dbName: 'example',
    host: 'localhost',
    port: 5432,
    ssl: false,
    findOneOrFailHandler: extensions_1.noEntityFoundError,
};
//# sourceMappingURL=orm.config.js.map