"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
const router = express_1.Router();
// Get all users
router.get('/', AppointmentsController_1.default.listAll);
router.get('/:id', AppointmentsController_1.default.listByUser);
router.get('/:id/points', AppointmentsController_1.default.valPoints);
router.post('/:id', AppointmentsController_1.default.addUserToApp);
// router.get('/:town', AppointmentsController.listByTown);
// router.get('/:town/:id', AppointmentsController.listById);
//
//
// // router.get('/:id', CentreController.fetchById);
// router.post('/', AppointmentsController.addCentre);
exports.default = router;
//# sourceMappingURL=AppointmentsRoutes.js.map