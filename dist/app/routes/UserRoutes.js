"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthenticationController_1 = __importDefault(require("../controllers/AuthenticationController"));
const router = express_1.Router();
// Get all users
router.get('/', UserController_1.default.listAll);
router.get('/:id', UserController_1.default.fetchById);
router.post('/register', UserController_1.default.register);
router.post('/login', AuthenticationController_1.default.login);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map