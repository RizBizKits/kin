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
}

export default CentreController;
