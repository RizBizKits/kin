import { CentresModel } from "../models/CentresModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {UserModel} from "../models/UserModel";
import {AppointmentsModel} from "../models/AppointmentsModel";
import moment from "moment";

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

    async listAppByCentre_s(id) {
        try {
            const centreRepository = getRepository(CentresModel);
            console.log("THIS IS THE ID: " + id);

            let centre = (await centreRepository.findOne({
                relations: ["appointments"],
                where: { id }
            }))

​
            let appointments = centre.appointments.filter(appt => appt.isBooked == null);

            console.log("TIME IN ISO IS: ", appointments[4].appointmentSlot);

            let formatDate = moment(appointments[4].appointmentSlot).format('YYYY-MMM-DD HH:mm:ss');

            console.log("FORMATTED TIME: ", formatDate);

            let startDate = new Date("2020-07-15");
            let endDate = new Date("2020-07-20");


            let resultAppt = appointments.filter(appt => {
                let date = new Date(appt.appointmentSlot);
                return (date >= startDate && date <= endDate);
            });


            // let bt = appointments.filter(appt => appt.appointmentSlot)

            console.log(centre);
            console.log(appointments);
            console.log(resultAppt)

            return appointments;
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
