import { UserModel } from "../models/UserModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {AppointmentsModel} from "../models/AppointmentsModel";

export class UserService {
    async get(): Promise<UserModel[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(UserModel);
            const users = await userRepository.find({
                relations: [ "appointments" ]
            });


            // let classes = await this.find({
            //     relations: [ "students" ]
            // });
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
            // const user = await userRepository.findByIds([data]);
            const user = await userRepository.findByIds([data],{
                relations:["appointments"]
            });

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
    async addAppointmentToUser(data:any, id): Promise<UserModel | null> {

        try {

            console.log("try in service");

            const userRepository = getRepository(UserModel);
            const appointmentsRepo = getRepository(AppointmentsModel);


            // const {appointments} = data;

            console.log(typeof data)
            console.log(data.appointmentSlot);
            const chosenUser = await userRepository.findOne(id, {relations: ["appointments"]});

            const appointment = new AppointmentsModel();

            console.log("LOAD APP:", appointment.appointmentSlot);
            console.log("REQ APP:::");
            console.log(data.appointmentSlot);

            appointment.appointmentSlot = data.appointmentSlot;
            appointment.isBooked = true;

            console.log("TYPE OF APP:::");

            console.log(typeof chosenUser["appointments"]);
            // chosenUser.appointments = [appointment];

            chosenUser.appointments.push(appointment);
            // chosenUser.appointments.push(appointment);

            // let obj = JSON.parse(data);
            // obj["appointments"].push(appointment);


            const savedAppointment = await appointmentsRepo.insert(appointment);

            console.log("appointment test printing: ");
            console.log([appointment]);

            console.log("CHOSEN USER: ", chosenUser);

            console.log(typeof chosenUser);
            console.log(typeof appointment);

            console.log("USER'S APP: ", appointment);


            // await chosenUser.appointments.push(appointment);
            // await chosenUser["appointments"].push(appointment);

            // let app = []
            //
            // app.push(data)

            // Object.entries(appointments);


            // console.log(data.appointments);

            //
            // let obj = JSON.parse(data);
            // await obj["appointments"].push(appointment);

            // data["appointments"].push(appointment);
            // chosenUser.appointments = data;

            // chosenUser.appointments = data.appointments;
            // chosenUser["appointments"].push(appointment);


            const savedUser = await userRepository.save(chosenUser);

            console.log("saved user in user model is: ", savedUser);
            console.log("done creating..");

            return savedUser;

        } catch (e) {
            console.log("CATCH IN SERVICE!!!  ")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }

    }

    async loadUserAppointments(data): Promise<UserModel[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(UserModel);
            const users = await userRepository.find({
                relations: [ "appointments" ]
            });


            // let classes = await this.find({
            //     relations: [ "students" ]
            // });
            return users;
        }
        catch (error) {
            return null
        }
    }


    // async addAppointmentToUser(data:any): Promise<UserModel | null> {
    //
    //     try {
    //         const userRepository = getRepository(UserModel);
    //         console.log("try in service");
    //
    //         console.log(data.user);
    //         const user = new UserModel();
    //
    //         user.email = data.user.email;
    //         user.firstName = data.user.firstName;
    //         user.lastName = data.user.lastName;
    //         user.username = data.user.username;
    //         user.password = data.user.password;
    //         user.dob = data.user.dob;
    //         user.bloodType = data.user.bloodType;
    //         user.points = data.user.points;
    //         user.houseNumber = data.user.houseNumber;
    //         user.streetName = data.user.streetName;
    //         user.town = data.user.town;
    //         user.postcode = data.user.postcode;
    //         user.badgeCounter = data.user.badgeCounter;
    //         user.isReferred = data.user.isReferred;
    //
    //
    //         console.log("EMAIL IS: " + user.email);
    //         console.log("firstName IS: " + user.firstName);
    //         console.log("lastName IS: " + user.lastName);
    //         console.log("username IS: " + user.username);
    //         console.log("PASSWORD IS: " + user.password);
    //         console.log("dob IS: " + user.dob);
    //         console.log("bloodType IS: " + user.bloodType);
    //         console.log("points IS: " + user.points);
    //         console.log("houseNumber IS: " + user.houseNumber);
    //         console.log("streetName IS: " + user.streetName);
    //         console.log("town IS: " + user.town);
    //         console.log("postcode IS: " + user.postcode);
    //         console.log("badgeCounter IS: " + user.badgeCounter);
    //         console.log("isReferred IS: " + user.isReferred);
    //
    //
    //
    //         await user.hashPassword();
    //
    //
    //         const appointmentsRepo = getRepository(AppointmentsModel);
    //         const appointment = new AppointmentsModel();
    //
    //         appointment.appointmentSlot = data.appointmentSlot;
    //
    //         const savedAppointment = await appointmentsRepo.save(appointment);
    //
    //         console.log("saved appointment in appointment model is: " + savedAppointment);
    //
    //         user.appointments = [appointment];
    //
    //         const savedUser = await userRepository.save(user);
    //
    //         console.log("saved user in user model is: " + savedUser);
    //
    //         console.log("done creating..");
    //
    //         return savedUser;
    //
    //     } catch (e) {
    //         console.log("CATCH IN SERVICE!!!  ")
    //         console.log(e);
    //         return Promise.reject(new Error("User already exists!"));
    //     }
    //
    // }

}
