import {NextFunction, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { CentreService } from '../services/CentreService';
const serviceChunk = new CentreService();

class CentreController {
    public static listAll = (req: Request, res: Response, next: NextFunction) => {
        serviceChunk.get().then(centres => {
            if (centres) {
                // res.status(200).send({centres));
                res.status(200).send({centres})

    }
        }).catch((err:Error) => {
            next( new Error('No centres found...') )
        })
    }
    public static listByTown = (req: Request, res: Response, next: NextFunction) => {
        const town = req.params.town;

        console.log(town);
        serviceChunk.getByTown(town).then(centres => {
            if (centres) {
                // res.status(200).send({centres));
                console.log("success in centre service, centres are found!!!")
                res.status(200).send({centres})

            }
        }).catch((err:Error) => {
            console.log("fail in centre service, no centres are returned!!!")

            next( new Error('No centres found...') )
        })
    }
    public static listById = (req: Request, res: Response, next: NextFunction) => {
        // const town = req.params.town;
        const id = req.params.id;


        console.log('id is: ' + id);
        // console.log('town: ' + town + ' and ' + 'id is: ' + id);
        serviceChunk.getById(id).then(centre => {
            if (centre) {
                // res.status(200).send({centres));
                console.log("success in centre service, centres are found!!!")
                res.status(200).send({centre})
            }
        }).catch((err:Error) => {
            console.log("fail in centre service, no centres are returned!!!")

            next( new Error('No centres found...') )
        })
    }
    public static addCentre = (req: Request, res: Response, next: any) => {
        serviceChunk.add(req.body).then(centre => {
            if (centre) {
                res.status(200).send({centre})
                return console.log("user is created");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A centre already exists...'
            })
        })
    }
    public static listAppByCentre = (req: Request, res: Response, next: any) => {


        const centreID = req.params.id;
        const town = req.params.town;
        const {appointments} = req.body;

        console.log("your req is", appointments);

        // console.log("your req is", req.body);

        serviceChunk.listAppByCentre_s(req.body, centreID).then(centre => {
            if (centre) {
                res.status(200).send({centre})
                return console.log("user is created");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A centre already exists...'
            })
        })
    }

    public static addAppointmentToCentre = (req: Request, res: Response, next: any) => {

        const centreID = req.params.id;
        console.log("YOU REQ IS:::: ", req.body);
        const {appointments} = req.body;
        console.log("APPOINTMENTS ARE :::: ", appointments);

        serviceChunk.addAppointmentToCentre_s(req.body, centreID).then(centre => {
            if (centre) {
                res.status(200).send({centre})
                return console.log("user is created");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A centre already exists...'
            })
        })
    }
}

export default CentreController;
