"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const serviceChunk = new UserService_1.UserService();
class UserController {
}
UserController.listAll = (req, res, next) => {
    serviceChunk.get().then(users => {
        if (users && users.length > 0) {
            res.status(200).json(users);
        }
    }).catch((err) => {
        next(new Error('An error has occured.'));
    });
};
UserController.fetchById = (req, res, next) => {
    const id = req.params.id;
    serviceChunk.index(id).then(user => {
        if (user) {
            res.status(200).send({ user });
            console.log("USER WITH GIVEN IS IS FOUND!!");
            console.log(user);
        }
    }).catch((err) => {
        next(new Error('Could not find user by given ID..'));
    });
};
UserController.register = (req, res, next) => {
    serviceChunk.add(req.body).then(user => {
        if (user) {
            res.status(200).send({ user });
            return console.log("user is created");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'A user with this email address already exists. Please try a different email.'
        });
    });
};
UserController.bookUserAppointment = (req, res, next) => {
    console.log("REQ FROM DETAIL PAGE", req.body);
    const userID = req.params.id;
    console.log("USER ID FROM DETAIL PAGE", userID);
    serviceChunk.addAppointmentToUser(req.body, userID).then(user => {
        if (user) {
            res.status(200).send({ user });
            return console.log("Appointment is booked for user");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'Could not book appointment. System Error.'
        });
    });
};
UserController.loadUserAppointments = (req, res, next) => {
    const userID = req.params.id;
    serviceChunk.loadUserAppointments_s(userID).then(user => {
        if (user) {
            res.status(200).send({ user });
            return console.log("user is created");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'A centre already exists...'
        });
    });
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map