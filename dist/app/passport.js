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
const passport = require('passport');
const UserModel_1 = require("./models/UserModel");
const typeorm_1 = require("typeorm");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, function (jwtPayload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
            const user = yield userRepository.findOne({
                where: {
                    id: jwtPayload.id
                }
            });
            if (!user) {
                return done(new Error(), false);
            }
            return done(null, user);
        }
        catch (err) {
            return done(new Error(), false);
        }
    });
}));
module.exports = null;
//# sourceMappingURL=passport.js.map