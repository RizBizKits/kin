"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const UserModel_1 = require("../models/UserModel");
const jwt = __importStar(require("jsonwebtoken"));
// function jwtAttachToken(user) {
//     return jwt.sign({user:user}, process.env.secret, {
//         expiresIn:'1h'
//     })
// }
class AuthenticationController {
}
AuthenticationController.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userRepository = typeorm_1.getRepository(UserModel_1.UserModel);
    let user;
    try {
        user = yield userRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
        // USER FOUND
        if (user) {
            console.log("User found!!!!");
            // WRONG PASSWORD
            if (!user.validateHashedPass(password)) {
                console.log("checking hash...");
                return res.status(401).send({
                    error: 'Password is incorrect. Please try again.'
                });
                // CORRECT PASSWORD
            }
            else {
                console.log("Password is correct!!!");
                console.log(process.env.SECRET);
                const jwtToken = jwt.sign({ user: user }, process.env.SECRET, {
                    expiresIn: '1h'
                });
                console.log(jwtToken);
                console.log("Sending token res....");
                return res.status(200).send({
                    user: user,
                    token: jwtToken
                });
            }
            // USER NOT FOUND
        }
        else {
            console.log("User not found!!!");
            return res.status(401).send({
                error: 'No user found'
            });
        }
        // UNKNOWN ERROR
    }
    catch (err) {
        console.log("CATCH ERRORING...");
        return res.status(401).send({
            error: 'Dead'
        });
    }
});
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map