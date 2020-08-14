import { CentresModel } from "../models/CentresModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {UserModel} from "../models/UserModel";
import {AppointmentsModel} from "../models/AppointmentsModel";


export class AppointmentsService {


    async get(): Promise<AppointmentsModel[] | null> {
        // Get users from database
        try {
            const appointmentsRepo = getRepository(AppointmentsModel);
            const appointments = await appointmentsRepo.find({
                relations: [ "user" ]
            });


            // let classes = await this.find({
            //     relations: [ "students" ]
            // });
            return appointments;
        }
        catch (error) {
            return null
        }
    }


    async getByUserId(data): Promise<AppointmentsModel[] | null> {
        // Get users from database
        try {
            const appointmentsRepository = getRepository(AppointmentsModel);
            // const appointments = await appointmentsRepository.find({});


            const appointments = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
                .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
                .where("UserModel.id = :id", {id: data})
                .getMany();

            return appointments;

        }
        catch (error) {
            return null
        }
    }
    async getByCentreId(data): Promise<AppointmentsModel[] | null> {
        // Get users from database
        try {
            const appointmentsRepository = getRepository(AppointmentsModel);

            const appointments = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
                .leftJoinAndSelect('AppointmentsModel.centre', 'CentreModel')
                .where("CentreModel.id = :id", {id: data})
                .getMany();

            return appointments;
        }
        catch (error) {
            return null
        }
    }



    async addUserToApp_s(data:any, id): Promise<AppointmentsModel | null> {

        try {

            const appID = data.appointmentID;
            console.log("appointment id: ", appID);

            const appointmentRepo = getRepository(AppointmentsModel);
            const userRepository = getRepository(UserModel);

            const chosenUser = await userRepository.findOne(id);
            const chosenAppointment = await appointmentRepo.findOne(appID, {relations: ["user"]});

            chosenAppointment.user = chosenUser;
            chosenAppointment.isBooked = true;

            const savedAppointment = await appointmentRepo.save(chosenAppointment);

            return savedAppointment;

        } catch (e) {
            console.log("CATCH IN SERVICE!!!  ")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }

    }

    // async addAppToUser_s(data:any, id): Promise<AppointmentsModel | null> {
    //
    //     try {
    //
    //         console.log("try in service");
    //
    //         const appointmentRepo = getRepository(AppointmentsModel);
    //         const userRepository = getRepository(UserModel);
    //
    //         console.log(typeof data)
    //
    //         console.log(data.appointmentSlot);
    //         const chosenUser = await userRepository.findOne(id);
    //
    //         const appointment = new AppointmentsModel();
    //         appointment.appointmentSlot = data.appointmentSlot;
    //         appointment.user = chosenUser;
    //
    //         const savedAppointment = await appointmentRepo.save(appointment);
    //
    //         console.log("done creating..");
    //
    //         return savedAppointment;
    //
    //     } catch (e) {
    //         console.log("CATCH IN SERVICE!!!  ")
    //         console.log(e);
    //         return Promise.reject(new Error("User already exists!"));
    //     }
    //
    // }

    // async add(data:any): Promise<AppointmentsModel | null> {
    //     try {
    //         const appointmentsRepository = getRepository(AppointmentsModel);
    //         const userRepository = getRepository(UserModel);
    //
    //         const appointment1 = new AppointmentsModel
    //         appointment1.appointmentSlot = data.appointmentSlot;
    //         await appointmentsRepository.save(appointment1);
    //
    //         const appointment2 = new AppointmentsModel
    //         appointment1.appointmentSlot = data.appointmentSlot;
    //         await appointmentsRepository.save(appointment2);
    //
    //         // const user = new UserModel()
    //
    //         const user = await userRepository.findByIds([3]);
    //
    //
    //         // user.appointments = [appointment1, appointment2];
    //
    //         await appointmentsRepository.save(appointment2);
    //
    //
    //         console.log("done adding centre");
    //         // const savedCentre = await appointmentsRepository.save(centre);
    //
    //         // const appointment = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
    //         //     .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
    //         //     .where("UserModel.id = :id", {id: data})
    //         //     .getMany();
    //
    //
    //
    //         return savedCentre;
    //
    //     } catch (e) {
    //         console.log("Can't add centre....")
    //         console.log(e);
    //         return Promise.reject(new Error("User already exists!"));
    //     }
    //
    //     // FINAL TESSSST
    // }


    // async add(data:any): Promise<AppointmentsModel | null> {
    //     try {
    //         const appointmentsRepository = getRepository(AppointmentsModel);
    //         const appointment = new AppointmentsModel();
    //
    //         const user = await appointmentsRepository.findByIds([data]);
    //
    //
    //         // const {centreName,houseNumber,streetName,town,postcode,contactNumber,email,websiteURL} = centre
    //
    //         appointment.appointmentSlot = data.appointmentSlot;
    //
    //
    //         console.log("done adding centre");
    //         // const savedCentre = await appointmentsRepository.save(centre);
    //
    //         // const appointment = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
    //         //     .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
    //         //     .where("UserModel.id = :id", {id: data})
    //         //     .getMany();
    //
    //
    //        await appointmentsRepository.save(appointment);
    //
    //         return savedCentre;
    //
    //     } catch (e) {
    //         console.log("Can't add centre....")
    //         console.log(e);
    //         return Promise.reject(new Error("User already exists!"));
    //     }
    // }
}
