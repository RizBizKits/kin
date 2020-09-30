import { CentresModel } from "../models/CentresModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {UserModel} from "../models/UserModel";
import {AppointmentsModel} from "../models/AppointmentsModel";
import moment from "moment";


export class AppointmentsService {


    async get(): Promise<AppointmentsModel[] | null> {

        try {
            const appointmentsRepo = getRepository(AppointmentsModel);
            const appointments = await appointmentsRepo.find({
                relations: [ "user" , "centre"]
            });

            return appointments;
        }
        catch (error) {
            return null
        }
    }


    async getByUserId(data) {
        try {
            const appointmentsRepository = getRepository(AppointmentsModel);

            // const appointments = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
            //     .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
            //     .where("UserModel.id = :id", {id: data})
            //     .getMany();
            console.log("USER APP IN PROS....")

            let appointments = (await appointmentsRepository.find({
                relations: ["user", "centre"]
            }))

            // 11 character random point code
            let code = Math.random().toString(36).slice(2);
            console.log("code is: ", code);

            let bookedAppointments = appointments.filter(appt => appt.isBooked !!= null);
            let bookedAppointmentsUser = bookedAppointments.filter(appt => appt.user.id == data && appt.centre !!= null);
            let bookedAppointmentsRes = bookedAppointmentsUser.map(appt => {
                return {
                    ...appt,
                    dateAsString: moment(appt.appointmentSlot).format('MMMM Do YYYY'),
                    timeAsString: moment(appt.appointmentSlot).format('HH:mm'),
                    eta: moment(appt.appointmentSlot).endOf('day').fromNow()
            }
            });

            return bookedAppointmentsRes;


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

            // 11 character random point code
            chosenAppointment.pointsCode = Math.random().toString(36).slice(2);

            const savedAppointment = await appointmentRepo.save(chosenAppointment);

            return savedAppointment;

        } catch (e) {
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }

    }

    async valPoints_s(id, code) {
        try {

            let appID = id;
            let pointsCode = code;

            console.log("service code: ", pointsCode);

            const appointmentRepo = getRepository(AppointmentsModel);
            const chosenAppt = await appointmentRepo.findOne(appID);

            console.log("pointcode for chosenAppt: " + chosenAppt.pointsCode);

            if (pointsCode == chosenAppt.pointsCode) {
                console.log("MATCH");
                return true;
            } else {
                console.log("NO MATCH")
                throw Error;
            }

        } catch (e) {
            console.log(e);
            return Promise.reject(new Error("Points don't match!"));
        }

    }
}
