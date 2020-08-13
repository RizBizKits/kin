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
const UserModel_1 = require("../models/UserModel");
const typeorm_1 = require("typeorm");
const AppointmentsModel_1 = require("../models/AppointmentsModel");
class UserService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const users = yield userRepository.find({
                    relations: ["appointments"]
                });
                // let classes = await this.find({
                //     relations: [ "students" ]
                // });
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    index(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get user from database
            try {
                console.log("TRYING INDEX IN USER SERVICE....");
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                // const user = await userRepository.findByIds([data]);
                const user = yield userRepository.findByIds([data], {
                    relations: ["appointments"]
                });
                return user;
            }
            catch (error) {
                console.log("ERROR ERROR ERROR IN USER SERVICE....");
                return null;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                console.log("try in service");
                const user = new UserModel_1.UserModel();
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
                const savedUser = yield userRepository.save(user);
                return savedUser;
            }
            catch (e) {
                console.log("CATCH IN SERVICE!!!  ");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
    addAppointmentToUser(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("try in service");
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const appointmentsRepo = typeorm_1.getRepository(AppointmentsModel_1.AppointmentsModel);
                // const {appointments} = data;
                console.log(typeof data);
                console.log(data.appointmentSlot);
                const chosenUser = yield userRepository.findOne(id);
                const appointment = new AppointmentsModel_1.AppointmentsModel();
                console.log("LOAD APP:", appointment.appointmentSlot);
                console.log("REQ APP:::");
                console.log(data.appointmentSlot);
                appointment.appointmentSlot = data.appointmentSlot;
                chosenUser.appointments = [appointment];
                const savedAppointment = yield appointmentsRepo.insert(appointment);
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
                const savedUser = yield userRepository.save(chosenUser);
                console.log("saved user in user model is: ", savedUser);
                console.log("done creating..");
                return savedUser;
            }
            catch (e) {
                console.log("CATCH IN SERVICE!!!  ");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
    loadUserAppointments(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const users = yield userRepository.find({
                    relations: ["appointments"]
                });
                // let classes = await this.find({
                //     relations: [ "students" ]
                // });
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map