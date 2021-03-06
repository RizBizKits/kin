import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthenticationController from '../controllers/AuthenticationController';
import AppointmentsController from "../controllers/AppointmentsController";
import CentreController from "../controllers/CentreController";
const isAuth = require('../isAuth');

const router = Router();

// Get all users
router.get('/', UserController.listAll);
router.get('/:id', UserController.fetchById);

router.get('/:id/appointments', UserController.loadUserAppointments);
router.post('/:id/appointments', UserController.bookUserAppointment);
router.patch('/:id/points', UserController.updatePoints);


router.post('/register', UserController.register);




router.post('/login', AuthenticationController.login);


export default router;