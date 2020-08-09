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
exports.default = UserController;
//# sourceMappingURL=UserController.js.map