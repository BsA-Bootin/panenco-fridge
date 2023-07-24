"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRequirement = void 0;
const papi_1 = require("@panenco/papi");
const adminRequirement = (req) => {
    const { token } = req;
    if (token.role === 'admin') {
        return;
    }
    throw new papi_1.Forbidden('NoAccessToUser', 'Not enough rights');
};
exports.adminRequirement = adminRequirement;
//# sourceMappingURL=admin.requirement.js.map