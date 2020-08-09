import {NextFunction, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { UserModel } from "../models/UserModel";
import * as jwt from 'jsonwebtoken';

// function jwtAttachToken(user) {
//     return jwt.sign({user:user}, process.env.secret, {
//         expiresIn:'1h'
//     })
// }

class AuthenticationController {
    public static login = async (req: Request, res: Response, next: NextFunction) => {
        const {email, password} = req.body;
        const userRepository = getRepository(UserModel);
        let user:UserModel;
        try {
            user = await userRepository.createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.email = :email', {email})
                .getOne();

            // USER FOUND
            if(user) {
                console.log("User found!!!!")

                // WRONG PASSWORD
                if(!user.validateHashedPass(password)) {
                    console.log("checking hash...")
                    return res.status(401).send({
                        error: 'Password is incorrect. Please try again.'
                    })

                // CORRECT PASSWORD
                } else {
                    console.log("Password is correct!!!");
                    console.log(process.env.SECRET);

                    const jwtToken = jwt.sign({user:user}, process.env.SECRET, {
                        expiresIn:'1h'
                    });

                    console.log(jwtToken);
                    console.log("Sending token res....");

                    return res.status(200).send({
                        user: user,
                        token: jwtToken
                    })
                }

            // USER NOT FOUND
            } else {
                console.log("User not found!!!")
                return res.status(401).send({
                    error: 'No user found'
                })
            }

        // UNKNOWN ERROR
        } catch (err) {
            console.log("CATCH ERRORING...")
            return res.status(401).send({
                error: 'Dead'
            })
        }
    }
}

export default AuthenticationController;
