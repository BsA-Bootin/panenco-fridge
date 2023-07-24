"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEntityFoundError = void 0;
const papi_1 = require("@panenco/papi");
const noEntityFoundError = function (entityName, where) {
    throw new papi_1.NotFound(`entityNotFound`, `${entityName} ${papi_1.NotFound.name}`);
};
exports.noEntityFoundError = noEntityFoundError;
