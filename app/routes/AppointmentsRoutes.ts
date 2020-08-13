import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const router = Router();

// Get all users
router.get('/', AppointmentsController.listAll);
router.get('/:id', AppointmentsController.listByUser);

router.post('/:id', AppointmentsController.addAppToUser);



// router.get('/:town', AppointmentsController.listByTown);
// router.get('/:town/:id', AppointmentsController.listById);
//
//
// // router.get('/:id', CentreController.fetchById);
// router.post('/', AppointmentsController.addCentre);


export default router;