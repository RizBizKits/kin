import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const router = Router();

// Get all users
router.get('/', AppointmentsController.listAll);
router.get('/:id', AppointmentsController.listByUser);
router.get('/:id/points', AppointmentsController.valPoints);

router.post('/:id', AppointmentsController.addUserToApp);


// router.get('/:town', AppointmentsController.listByTown);
// router.get('/:town/:id', AppointmentsController.listById);
//
//
// // router.get('/:id', CentreController.fetchById);
// router.post('/', AppointmentsController.addCentre);


export default router;