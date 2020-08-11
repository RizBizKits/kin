"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CentreController_1 = __importDefault(require("../controllers/CentreController"));
const router = express_1.Router();
// Get all users
router.get('/', CentreController_1.default.listAll);
// router.get('/:id', CentreController.fetchById);
router.post('/', CentreController_1.default.addCentre);
exports.default = router;
//# sourceMappingURL=CentreRoutes.js.map