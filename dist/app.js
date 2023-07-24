"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./controllers/users/user.controller");
const routing_controllers_1 = require("routing-controllers");
const papi_1 = require("@panenco/papi");
require("express-async-errors");
const core_1 = require("@mikro-orm/core");
const orm_config_1 = __importDefault(require("./orm.config"));
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const product_controller_1 = require("./controllers/products/product.controller");
const fridge_controller_1 = require("./controllers/fridges/fridge.controller");
const recipe_controller_1 = require("./controllers/recipes/recipe.controller");
const auth_controller_1 = require("./controllers/auth/auth.controller");
class App {
    constructor() {
        // Init server
        this.host = (0, express_1.default)();
        this.host.use(express_1.default.json());
        this.host.use((req, res, next) => {
            console.log(req.method, req.url);
            next();
        });
        this.host.use((req, __, next) => {
            core_1.RequestContext.create(this.orm.em, next);
        });
        this.initializeControllers([user_controller_1.UserController]);
        this.initializeControllers([product_controller_1.ProductController]);
        this.initializeControllers([fridge_controller_1.FridgeController]);
        this.initializeControllers([recipe_controller_1.RecipeController]);
        this.initializeControllers([auth_controller_1.AuthController]);
        this.initializeSwagger();
        this.host.use(papi_1.errorMiddleware);
    }
    initializeControllers(controllers) {
        (0, routing_controllers_1.useExpressServer)(this.host, {
            cors: {
                origin: "*",
                exposedHeaders: ["x-auth"], // Allow the header `x-auth` to be exposed to the client. This is needed for the authentication to work later.
            },
            controllers,
            defaultErrorHandler: false,
            routePrefix: "/api",
            authorizationChecker: (0, papi_1.getAuthenticator)('jwtSecretFromConfigHere'), // Tell routing-controllers to use the papi authentication checker
        });
    }
    initializeSwagger() {
        const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
        const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        }); // convert the metadata to an OpenAPI json schema
        const routingControllersOptions = {
            routePrefix: '/api', // Set the route prefix so swagger knows all endpoints are prefixed with /api
        }; // configure some general options
        const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
        const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, routingControllersOptions, {
            components: {
                schemas,
                securitySchemes: {
                    JWT: {
                        in: 'header',
                        name: 'x-auth',
                        type: 'apiKey',
                        bearerFormat: 'JWT',
                        description: 'JWT Authorization header using the JWT scheme. Example: "x-auth: {token}"',
                    },
                },
            },
            security: [{ JWT: [] }],
        });
        this.host.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec)); // Host swagger ui on /docs
    }
    listen() {
        this.host.listen(3000, () => {
            console.info(`🚀 http://localhost:3000`);
            console.info(`========================`);
        });
    }
    async createConnection() {
        try {
            this.orm = await core_1.MikroORM.init(orm_config_1.default);
        }
        catch (error) {
            console.log('Error while connecting to the database', error);
        }
    }
}
exports.App = App;
