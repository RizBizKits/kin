import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthenticationController from '../controllers/AuthenticationController';


const router = Router();

// Get all users
router.get('/', UserController.listAll);
router.get('/:id', UserController.fetchById);

router.post('/register', UserController.register);
router.post('/login', AuthenticationController.login);


export default router;