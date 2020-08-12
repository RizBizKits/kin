import { Request, Response, Router } from 'express';
import userRoutes from './UserRoutes';
import centreRoutes from './CentreRoutes';
import appointmentsRoutes from './AppointmentsRoutes';


const routes = Router();

// USERS
routes.use('/user', userRoutes);
routes.use('/centre', centreRoutes)
routes.use('/appointments', appointmentsRoutes)

export { routes };