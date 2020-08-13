"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CentresModel_1 = require("../models/CentresModel");
const typeorm_1 = require("typeorm");
const AppointmentsModel_1 = require("../models/AppointmentsModel");
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
    listAppByCentre_s(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
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
                const centre = yield centreRepository.findOne({
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