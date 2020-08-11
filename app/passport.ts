const passport = require('passport')
import { UserModel } from "./models/UserModel";
import {getRepository} from "typeorm";

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    }, async function (jwtPayload, done) {
        try {

            const userRepository = getRepository(UserModel);

            const user = await userRepository.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null