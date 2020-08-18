"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CentresModel_1 = require("../models/CentresModel");
const typeorm_1 = require("typeorm");
const AppointmentsModel_1 = require("../models/AppointmentsModel");
const moment_1 = __importDefault(require("moment"));
class CentreService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                const centres = yield centreRepository.find({
                    relations: ["appointments"]
                });
                return centres;
            }
            catch (error) {
                return null;
            }
        });
    }
    getByTown(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                console.log("THIS IS THE ARGUMENT: " + data);
                const centres = yield centreRepository.createQueryBuilder('CentresModel')
                    .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
                    .where("CentresModel.town = :town", { town: data })
                    .getMany();
                console.log("LOGGING OUTPUT = " + centres);
                return centres;
            }
            catch (error) {
                console.log("no centres found by town....");
                return null;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                console.log("THIS IS THE ID: " + id);
                const centre = yield centreRepository.createQueryBuilder('CentresModel')
                    .leftJoinAndSelect('CentresModel.appointments', 'AppointmentsModel')
                    .where("CentresModel.id = :id", { id: id })
                    .getOne();
                console.log("LOGGING OUTPUT = " + centre);
                return centre;
            }
            catch (error) {
                console.log("no centres found by town....");
                return null;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                const centre = new CentresModel_1.CentresModel();
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
                const savedCentre = yield centreRepository.save(centre);
                return savedCentre;
            }
            catch (e) {
                console.log("Can't add centre....");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
    listAppByCentre_s(id, startD, endD) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                let centre = (yield centreRepository.findOne({
                    relations: ["appointments"],
                    where: { id }
                }));
                let appointments = centre.appointments.filter(appt => appt.isBooked == null);
                console.log("TIME IN ISO IS: ", appointments[4].appointmentSlot);
                let formatDate = moment_1.default(appointments[4].appointmentSlot).format('YYYY-MMM-DD HH:mm:ss');
                console.log("FORMATTED TIME: ", formatDate);
                console.log("START DATE: ", startD);
                console.log("END DATE: ", endD);
                let startDateFormatted = moment_1.default(startD).format("YYYY-MM-DD");
                let endDateFormatted = moment_1.default(endD).format("YYYY-MM-DD");
                console.log("FORMATTED START DATE: ", startDateFormatted);
                console.log("FORMATTED END DATE: ", endDateFormatted);
                let startDateFin = new Date(startDateFormatted);
                let endDateFin = new Date(endDateFormatted);
                let resultAppt = appointments.filter(appt => {
                    let date = new Date(appt.appointmentSlot);
                    return (date >= startDateFin && date <= endDateFin);
                });
                // let results = resultAppt.map(date => moment(date.appointmentSlot).format('YYYY-MMM-DD HH:mm:ss'));
                let results = resultAppt.map(appt => {
                    return Object.assign({}, appt, { dateAsString: moment_1.default(appt.appointmentSlot).format('YYYY-MMM-DD HH:mm:ss') });
                });
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
                console.log("available appts", results);
                return results;
            }
            catch (error) {
                console.log("no centres found by town....");
                return null;
            }
        });
    }
    addAppointmentToCentre_s(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const centreRepo = typeorm_1.getRepository(CentresModel_1.CentresModel);
                const appointmentsRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const chosenCentre = yield centreRepo.findOne(id, {
                    relations: ["appointments"]
                });
                const appointment = new AppointmentsModel_1.AppointmentsModel();
                appointment.appointmentSlot = data.appointmentSlot;
                chosenCentre.appointments.push(appointment);
                yield appointmentsRepo.insert(appointment);
                const savedCentre = yield centreRepo.save(chosenCentre);
                return savedCentre;
            }
            catch (e) {
                console.log("CATCH IN SERVICE!!!  ");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
}
exports.CentreService = CentreService;
//# sourceMappingURL=CentreService.js.map