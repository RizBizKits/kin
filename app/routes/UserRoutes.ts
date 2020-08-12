import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthenticationController from '../controllers/AuthenticationController';
import AppointmentsController from "../controllers/AppointmentsController";
const isAuth = require('../isAuth');

const router = Router();

// Get all users
router.get('/', UserController.listAll);
router.get('/:id', UserController.fetchById);

// router.get('/:id/appointments', AppointmentsController.listByUser);
router.post('/:id/appointments', UserController.bookUserAppointment);
// router.get('/:id/appointments', UserController.getByUser);



router.post('/register', UserController.register);
router.post('/login', AuthenticationController.login);


export default router;