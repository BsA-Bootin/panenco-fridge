"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
(async () => {
    const app = new app_1.App();
    await app.createConnection();
    app.listen();
})();
