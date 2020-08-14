"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppointmentsService_1 = require("../services/AppointmentsService");
const serviceChunk = new AppointmentsService_1.AppointmentsService();
class AppointmentsController {
}
AppointmentsController.listAll = (req, res, next) => {
    serviceChunk.get().then(appointments => {
        if (appointments) {
            res.status(200).json(appointments);
        }
    }).catch((err) => {
        next(new Error('An error has occured.'));
    });
};
AppointmentsController.listByUser = (req, res, next) => {
    const userID = req.params.id;
    serviceChunk.getByUserId(userID).then(appointments => {
        if (appointments) {
            res.status(200).send({ appointments });
        }
    }).catch((err) => {
        next(new Error('No appointments found...'));
    });
};
AppointmentsController.listByCentre = (req, res, next) => {
    const centreID = req.params.id;
    serviceChunk.getByCentreId(centreID).then(appointments => {
        if (appointments) {
            res.status(200).send({ appointments });
        }
    }).catch((err) => {
        next(new Error('No appointments found...'));
    });
};
AppointmentsController.addUserToApp = (req, res, next) => {
    const userID = req.params.id;
    serviceChunk.addUserToApp_s(req.body, userID).then(appointment => {
        if (appointment) {
            res.status(200).send({ appointment });
        }
    }).catch(err => {
        res.status(400).send({
            error: 'Sorry. The system could not book that!'
        });
    });
};
exports.default = AppointmentsController;
//# sourceMappingURL=AppointmentsController.js.map