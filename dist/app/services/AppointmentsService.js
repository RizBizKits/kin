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
const typeorm_1 = require("typeorm");
const UserModel_1 = require("../models/UserModel");
const AppointmentsModel_1 = require("../models/AppointmentsModel");
const moment_1 = __importDefault(require("moment"));
class AppointmentsService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentsRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const appointments = yield appointmentsRepo.find({
                    relations: ["user", "centre"]
                });
                return appointments;
            }
            catch (error) {
                return null;
            }
        });
    }
    getByUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentsRepository = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                // const appointments = await appointmentsRepository.createQueryBuilder('AppointmentsModel')
                //     .leftJoinAndSelect('AppointmentsModel.user', 'UserModel')
                //     .where("UserModel.id = :id", {id: data})
                //     .getMany();
                console.log("USER APP IN PROS....");
                let appointments = (yield appointmentsRepository.find({
                    relations: ["user", "centre"]
                }));
                // 11 character random point code
                let code = Math.random().toString(36).slice(2);
                console.log("code is: ", code);
                let bookedAppointments = appointments.filter(appt => appt.isBooked != null);
                let bookedAppointmentsUser = bookedAppointments.filter(appt => appt.user.id == data && appt.centre != null);
                let bookedAppointmentsRes = bookedAppointmentsUser.map(appt => {
                    return Object.assign({}, appt, { dateAsString: moment_1.default(appt.appointmentSlot).format('MMMM Do YYYY'), timeAsString: moment_1.default(appt.appointmentSlot).format('HH:mm'), eta: moment_1.default(appt.appointmentSlot).endOf('day').fromNow() });
                });
                return bookedAppointmentsRes;
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
                const appID = data.appointmentID;
                console.log("appointment id: ", appID);
                const appointmentRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const chosenUser = yield userRepository.findOne(id);
                const chosenAppointment = yield appointmentRepo.findOne(appID, { relations: ["user"] });
                chosenAppointment.user = chosenUser;
                chosenAppointment.isBooked = true;
                // 11 character random point code
                chosenAppointment.pointsCode = Math.random().toString(36).slice(2);
                const savedAppointment = yield appointmentRepo.save(chosenAppointment);
                return savedAppointment;
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
    valPoints_s(id, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appID = id;
                let pointsCode = code;
                console.log("service code: ", pointsCode);
                const appointmentRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                const chosenAppt = yield appointmentRepo.findOne(appID);
                console.log("pointcode for chosenAppt: " + chosenAppt.pointsCode);
                if (pointsCode == chosenAppt.pointsCode) {
                    console.log("MATCH");
                    return true;
                }
                else {
                    console.log("NO MATCH");
                    throw Error;
                }
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new Error("Points don't match!"));
            }
        });
    }
}
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=AppointmentsService.js.map