import { UserModel } from "../models/UserModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';

export class UserService {
    async get(): Promise<UserModel[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(UserModel);
            const users = await userRepository.find({});
            return users;
        }
        catch (error) {
            return null
        }
    }

    async index(data:string) {
        // Get user from database
        try {

            console.log("TRYING INDEX IN USER SERVICE....")
            const userRepository = getRepository(UserModel);
            const user = await userRepository.findByIds([data]);
            return user;
        }
        catch (error) {
            console.log("ERROR ERROR ERROR IN USER SERVICE....")
            return null
        }
    }
    async add(data:any): Promise<UserModel | null> {
        try {
            const userRepository = getRepository(UserModel);
            console.log("try in service");
            const user = new UserModel();

            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.username = data.username;
            user.password = data.password;
            user.dob = data.dob;
            user.bloodType = data.bloodType;
            user.points = data.points;
            user.houseNumber = data.houseNumber;
            user.streetName = data.streetName;
            user.town = data.town;
            user.postcode = data.postcode;
            user.badgeCounter = data.badgeCounter;
            user.isReferred = data.isReferred;

            user.hashPassword();

            console.log("done creating..");

            const savedUser = await userRepository.save(user);
            return savedUser;

        } catch (e) {
            console.log("CATCH IN SERVICE!!!  ")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }
    }
}
