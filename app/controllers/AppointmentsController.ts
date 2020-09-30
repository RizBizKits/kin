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
                console.log("FOUND APPS HELD BY USER")
                res.status(200).send({appointments})
            }
        }).catch((err:Error) => {
            next( new Error('You have 0 upcoming appointments') )
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

    public static valPoints = (req: Request, res: Response, next: any) => {


        const apptID = req.params.id;
        // let codee = req.query.code;
        let code = (req.query as any).code;


        let p = JSON.parse(code);

        let pointsCode = p.pointsCode;


        console.log("apptID is: ", apptID);
        console.log("code is: ", pointsCode);

        serviceChunk.valPoints_s(apptID, pointsCode).then(point => {

            res.status(200).send({
                message: "Your points have been updated!"
            })
            return console.log("points updates");


            // if (point) {
            //     res.status(200).send({
            //         message: "Your points have been updated!"
            //     })
            //     return console.log("points updates");
            // }
        }).catch(err => {
            res.status(400).send({
                error: 'System Error'
            })
        })
    }


    public static addUserToApp = (req: Request, res: Response, next: any) => {

        const userID = req.params.id;

        serviceChunk.addUserToApp_s(req.body, userID).then(appointment => {
            if (appointment) {
                res.status(200).send({appointment})
            }
        }).catch(err => {
            res.status(400).send({
                error: 'Sorry. The system could not book that!'
            })
        })
    }
}

export default AppointmentsController;
