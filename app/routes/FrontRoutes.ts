import { Router } from 'express';
import FrontController from '../controllers/FrontController';

const router = Router();

// Get all users
router.post('/', FrontController.login);

export default router;