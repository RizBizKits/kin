import { CentresModel } from "../models/CentresModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {UserModel} from "../models/UserModel";
import {AppointmentsModel} from "../models/AppointmentsModel";

export class CentreService {
    async get(): Promise<CentresModel[] | null> {
        // Get users from database
        try {
            const centreRepository = getRepository(CentresModel);
            const centres = await centreRepository.find({
                relations: ["appointments"]
            });
            return centres;
        }
        catch (error) {
            return null
        }
    }

    async getByTown(data:string): Promise<CentresModel[] | null> {
        // Get users from database
        try {
            const centreRepository = getRepository(CentresModel);
            console.log("THIS IS THE ARGUMENT: " + data);

            const centres = await centreRepository.createQueryBuilder('CentresModel')
                .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
                .where("CentresModel.town = :town", {town: data})
                .getMany();

            console.log("LOGGING OUTPUT = " + centres);
            return centres;
        }
        catch (error) {
            console.log("no centres found by town....");
            return null
        }
    }

    async getById(id): Promise<CentresModel | null> {
        // Get users from database
        try {
            const centreRepository = getRepository(CentresModel);
            console.log("THIS IS THE ID: " + id);

            const centre = await centreRepository.createQueryBuilder('CentresModel')
                .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
                .where("CentresModel.id = :id", {id: id})
                .getOne();

            console.log("LOGGING OUTPUT = " + centre);
            return centre;
        }
        catch (error) {
            console.log("no centres found by town....");
            return null
        }
    }


    async add(data:any): Promise<CentresModel | null> {
        try {
            const centreRepository = getRepository(CentresModel);
            const centre = new CentresModel();
            // const {centreName,houseNumber,streetName,town,postcode,contactNumber,email,websiteURL} = centre

            centre.centreName = data.centreName;
            centre.houseNumber = data.houseNumber;
            centre.streetName = data.streetName;
            centre.town = data.town;
            centre.postcode = data.postcode;
            centre.contactNumber = data.contactNumber;
            centre.email = data.email;
            centre.websiteURL = data.websiteURL;

            console.log("done adding centre");

            const savedCentre = await centreRepository.save(centre);
            return savedCentre;

        } catch (e) {
            console.log("Can't add centre....")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }
    }

    async listAppByCentre_s(data, id): Promise<CentresModel | null> {
        // Get users from database
        try {
            const centreRepository = getRepository(CentresModel);
            console.log("THIS IS THE ID: " + id);

            // const centre = await centreRepository.createQueryBuilder('CentresModel')
            //     .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
            //     .where("CentresModel.id = :id", {id: id})
            //     .andWhere("AppointmentsModel.isBooked = :isBooked", {isBooked: 1})
            //     .getOne();


            // const centres = await centreRepository.find({
            //     relations: ["appointments"],
            //     id: id,
            //     isBooked: true
            // });

            const centre = await centreRepository.findOne({
                join: { alias: 'centre', innerJoin: { appointments: 'centre.appointments' } },
                where: qb => {
                    qb.where({
                        id: id
                    }).andWhere('appointments.isBooked = :isBooked', { isBooked: null });
                }
            });

            // const centre = await centreRepository.createQueryBuilder()
            //     .select("centre.id", "id")
            //     .addSelect(subQuery => {
            //         return subQuery
            //             .select("appointments.isBooked", "isBooked")
            //             .from(AppointmentsModel, "AppointmentsModel")
            //             .limit(1);
            //     }, "name")
            //     .from(CentresModel, "CentresModel")
            //     .getOne();



            // const centre = await centreRepository.findOne({
            //     where: {id},
            //     relations: ["appointments"]
            // })


            // const centre = await centreRepository.createQueryBuilder('CentresModel')
            //     .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
            //     .where("CentresModel.id = :id", {id: id})
            //     .orWhere("CentresModel.id = :id", {id: 92})
            //     .getOne();


            console.log("LOGGING SQL = ", centre);

            return centre;
        }
        catch (error) {
            console.log("no centres found by town....");
            return null
        }
    }

    async addAppointmentToCentre_s(data:any, id): Promise<CentresModel | null> {

        try {
            const centreRepo = getRepository(CentresModel);
            const appointmentsRepo = getRepository(AppointmentsModel);
            const chosenCentre = await centreRepo.findOne(id,{
                relations:["appointments"]
            });

            const appointment = new AppointmentsModel();

            appointment.appointmentSlot = data.appointmentSlot;

            chosenCentre.appointments.push(appointment);

            await appointmentsRepo.insert(appointment);

            const savedCentre = await centreRepo.save(chosenCentre);
            return savedCentre;

        } catch (e) {
            console.log("CATCH IN SERVICE!!!  ")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }

    }
}
