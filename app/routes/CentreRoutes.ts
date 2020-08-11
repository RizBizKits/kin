import { Router } from 'express';
import CentreController from '../controllers/CentreController';

const router = Router();

// Get all users
router.get('/', CentreController.listAll);
// router.get('/:id', CentreController.fetchById);
router.post('/', CentreController.addCentre);


export default router;