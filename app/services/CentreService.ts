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

    async listAppByCentre_s(id, startD, endD) {
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
            console.log("START DATE: ", startD);
            console.log("END DATE: ", endD);

            let startDateFormatted = moment(startD).format("YYYY-MM-DD");
            let endDateFormatted = moment(endD).format("YYYY-MM-DD");

            console.log("FORMATTED START DATE: ", startDateFormatted);
            console.log("FORMATTED END DATE: ", endDateFormatted);


            let startDateFin = new Date(startDateFormatted);
            let endDateFin = new Date(endDateFormatted);


            let resultAppt = appointments.filter(appt => {
                let date = new Date(appt.appointmentSlot);
                return (date >= startDateFin && date <= endDateFin);
            });

            let results = resultAppt.map(date => moment(date.appointmentSlot).format('YYYY-MMM-DD HH:mm:ss'));


            // let resultAppFormatted = resultAppt.forEach(appt => {
            //     // let date = new Date(appt.appointmentSlot);
            //     // return (date >= startDateFin && date <= endDateFin);
            //     // let date = new Date(appt.appointmentSlot);
            //     // console.log("app at: ", date);
            //     return moment(appt.appointmentSlot).format('YYYY-MMM-DD HH:mm:ss');
            //     // moment(date).format('YYYY-MMM-DD HH:mm:ss');
            // });
            //
            // let results = resultAppt.map(date => moment(date.appointmentSlot).format('YYYY-MMM-DD HH:mm:ss'));
            // console.log("available appts in correct format: ", results);

            console.log("available appts", resultAppt);

            return resultAppt;
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
