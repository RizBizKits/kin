import { Request, Response, Router } from 'express';
import userRoutes from './UserRoutes';

const routes = Router();

// USERS
routes.use('/user', userRoutes);
// routes.use('/', frontRoutes)


export { routes };