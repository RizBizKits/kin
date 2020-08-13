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
const typeorm_1 = require("typeorm");
const UserModel_1 = require("../models/UserModel");
const AppointmentsModel_1 = require("../models/AppointmentsModel");
class AppointmentsService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const appointmentsRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const appointments = yield appointmentsRepo.find({
                    relations: ["user"]
                });
                // let classes = await this.find({
                //     relations: [ "students" ]
                // });
                return appointments;
            }
            catch (error) {
                return null;
            }
        });
    }
    getByUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const appointmentsRepository = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                // const appointments = await appointmentsRepository.find({});
                const appointments = yield appointmentsRepository.createQueryBuilder('AppointmentsModel')
                    .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
                    .where("UserModel.id = :id", { id: data })
                    .getMany();
                return appointments;
            }
            catch (error) {
                return null;
            }
        });
    }
    getByCentreId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const appointmentsRepository = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const appointments = yield appointmentsRepository.createQueryBuilder('AppointmentsModel')
                    .leftJoinAndSelect('AppointmentsModel.centre', 'CentreModel')
                    .where("CentreModel.id = :id", { id: data })
                    .getMany();
                return appointments;
            }
            catch (error) {
                return null;
            }
        });
    }
    addUserToApp_s(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("try in service");
                const appID = data.id;
                console.log("appointment id: ", appID);
                const appointmentRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const chosenUser = yield userRepository.findOne(id);
                const chosenAppointment = yield appointmentRepo.findOne(appID, { relations: ["user"] });
                chosenAppointment.user = chosenUser;
                chosenAppointment.isBooked = true;
                const savedAppointment = yield appointmentRepo.save(chosenAppointment);
                console.log("done creating..");
                return savedAppointment;
            }
            catch (e) {
                console.log("CATCH IN SERVICE!!!  ");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
}
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=AppointmentsService.js.map