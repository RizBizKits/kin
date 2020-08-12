import { Router } from 'express';
import CentreController from '../controllers/CentreController';
import AppointmentsController from "../controllers/AppointmentsController";

const router = Router();

// Get all users
router.get('/', CentreController.listAll);
router.get('/:town', CentreController.listByTown);
router.get('/:town/:id', CentreController.listById);

router.get('/:town/:id/appointments', CentreController.listAppByCentre);
router.post('/:town/:id/appointments', CentreController.addAppointmentToCentre);

// router.get('/:id', CentreController.fetchById);
router.post('/', CentreController.addCentre);


export default router;