import {NextFunction, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { UserService } from '../services/UserService';
const serviceChunk = new UserService();

class UserController {
    public static listAll = (req: Request, res: Response, next: NextFunction) => {
        serviceChunk.get().then(users => {
            if (users && users.length > 0) {
                res.status(200).json(users);
            }
        }).catch((err:Error) => {
            next( new Error('An error has occured.') )
        })
    }
    public static fetchById = (req: Request, res: Response, next: NextFunction) => {
        const id:string = req.params.id;

        serviceChunk.index(id).then(user => {
            if (user) {
                res.status(200).send({user})
                console.log("USER WITH GIVEN IS IS FOUND!!")
                console.log(user)
            }
        }).catch((err:Error) => {
            next( new Error('Could not find user by given ID..') )
        })
    }
    public static register = (req: Request, res: Response, next: any) => {
        serviceChunk.add(req.body).then(user => {
            if (user) {
                res.status(200).send({user})
                return console.log("user is created");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A user with this email address already exists. Please try a different email.'
            })
        })
    }

    public static bookUserAppointment = (req: Request, res: Response, next: any) => {

        console.log("REQ FROM DETAIL PAGE", req.body);

        const userID = req.params.id;

        console.log("USER ID FROM DETAIL PAGE", userID);

        serviceChunk.addAppointmentToUser(req.body, userID).then(user => {
            if (user) {
                res.status(200).send({user})
                return console.log("Appointment is booked for user");
            }
        }).catch(err => {
            res.status(400).send({
                error: 'Could not book appointment. System Error.'
            })
        })
    }

    // public static fetchUserAppointments = (req: Request, res: Response, next: any) => {
    //
    //     const userID = req.params.id
    //
    //     serviceChunk.loadUserAppointments(req.body, userID).then(user => {
    //         if (user) {
    //             res.status(200).send({user})
    //             return console.log("user is created");
    //         }
    //     }).catch(err => {
    //         res.status(400).send({
    //             error: 'A centre already exists...'
    //         })
    //     })
    // }

    // public static addByUser = (req: Request, res: Response, next: any) => {
    //
    //
    //     const {user, appointments} = req.body
    //
    //     console.log("your req is", req.body);
    //     // console.dir("THE REQ USER IS: " + user + "AND THE APPOINTMENTS IS " + appointments);
    //
    //     serviceChunk.addAppointmentToUser(req.body).then(user => {
    //         if (user) {
    //             res.status(200).send({user})
    //             return console.log("user is created");
    //         }
    //     }).catch(err => {
    //         res.status(400).send({
    //             error: 'A centre already exists...'
    //         })
    //     })
    // }
}

export default UserController;
