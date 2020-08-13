import {NextFunction, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { AppointmentsService } from '../services/AppointmentsService';
const serviceChunk = new AppointmentsService();

class AppointmentsController {

    public static listAll = (req: Request, res: Response, next: NextFunction) => {
        serviceChunk.get().then(appointments => {
            if (appointments) {
                res.status(200).json(appointments);
            }
        }).catch((err:Error) => {
            next( new Error('An error has occured.') )
        })
    }

    public static listByUser = (req: Request, res: Response, next: NextFunction) => {

        const userID = req.params.id;

        serviceChunk.getByUserId(userID).then(appointments => {
            if (appointments) {
                res.status(200).send({appointments})
            }
        }).catch((err:Error) => {
            next( new Error('No appointments found...') )
        })
    }

    public static listByCentre = (req: Request, res: Response, next: NextFunction) => {

        const centreID = req.params.id;

        serviceChunk.getByCentreId(centreID).then(appointments => {
            if (appointments) {
                res.status(200).send({appointments})
            }
        }).catch((err:Error) => {
            next( new Error('No appointments found...') )
        })
    }

    public static addUserToApp = (req: Request, res: Response, next: any) => {

        const userID = req.params.id;
        console.log("YOU REQ IS:::: ", req.body);

        serviceChunk.addUserToApp_s(req.body, userID).then(appointment => {
            if (appointment) {
                res.status(200).send({appointment})
                return console.log("user is created");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A centre already exists...'
            })
        })
    }
}

export default AppointmentsController;
