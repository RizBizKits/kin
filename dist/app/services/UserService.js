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
class UserService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
                const users = yield userRepository.find({});
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
                const user = yield userRepository.findByIds([data]);
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
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map