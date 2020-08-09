"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FrontController_1 = __importDefault(require("../controllers/FrontController"));
const router = express_1.Router();
// Get all users
router.post('/', FrontController_1.default.login);
exports.default = router;
//# sourceMappingURL=FrontRoutes.js.map