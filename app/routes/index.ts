import { Request, Response, Router } from 'express';
import userRoutes from './UserRoutes';
import centreRoutes from './CentreRoutes';


const routes = Router();

// USERS
routes.use('/user', userRoutes);
routes.use('/centre', centreRoutes)


export { routes };