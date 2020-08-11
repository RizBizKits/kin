"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const CentreRoutes_1 = __importDefault(require("./CentreRoutes"));
const routes = express_1.Router();
exports.routes = routes;
// USERS
routes.use('/user', UserRoutes_1.default);
routes.use('/centre', CentreRoutes_1.default);
//# sourceMappingURL=index.js.map