"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CentreService_1 = require("../services/CentreService");
const serviceChunk = new CentreService_1.CentreService();
class CentreController {
}
CentreController.listAll = (req, res, next) => {
    serviceChunk.get().then(centres => {
        if (centres) {
            // res.status(200).send({centres));
            res.status(200).send({ centres });
        }
    }).catch((err) => {
        next(new Error('No centres found...'));
    });
};
CentreController.listByTown = (req, res, next) => {
    const town = req.params.town;
    console.log(town);
    serviceChunk.getByTown(town).then(centres => {
        if (centres) {
            // res.status(200).send({centres));
            console.log("success in centre service, centres are found!!!");
            res.status(200).send({ centres });
        }
    }).catch((err) => {
        console.log("fail in centre service, no centres are returned!!!");
        next(new Error('No centres found...'));
    });
};
CentreController.listById = (req, res, next) => {
    // const town = req.params.town;
    const id = req.params.id;
    console.log('id is: ' + id);
    // console.log('town: ' + town + ' and ' + 'id is: ' + id);
    serviceChunk.getById(id).then(centre => {
        if (centre) {
            // res.status(200).send({centres));
            console.log("success in centre service, centres are found!!!");
            res.status(200).send({ centre });
        }
    }).catch((err) => {
        console.log("fail in centre service, no centres are returned!!!");
        next(new Error('No centres found...'));
    });
};
CentreController.addCentre = (req, res, next) => {
    serviceChunk.add(req.body).then(centre => {
        if (centre) {
            res.status(200).send({ centre });
            return console.log("user is created");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'A centre already exists...'
        });
    });
};
CentreController.listAppByCentre = (req, res, next) => {
    const centreID = req.params.id;
    const town = req.params.town;
    // const {appointments} = req.body;
    // const startD= req.query.pickedDates[0];
    // const endD = req.query.pickedDates[1];
    // const startD = dates.startD;
    // const startE = dates.endD;
    console.log("your req is", req.query.dates);
    const startD = req.query.dates[0];
    const endD = req.query.dates[1];
    console.log("your start date is ", startD);
    console.log("your end date is ", endD);
    serviceChunk.listAppByCentre_s(centreID, startD, endD).then(appointments => {
        if (appointments && appointments.length !== 0) {
            res.status(200).send(appointments);
            return console.log("user is created");
        }
        else {
            res.status(400).send({
                error: "No appointments available for those dates."
            });
            // return console.log("user is created");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'System Error'
        });
    });
};
CentreController.addAppointmentToCentre = (req, res, next) => {
    const centreID = req.params.id;
    console.log("YOU REQ IS:::: ", req.body);
    const { appointments } = req.body;
    console.log("APPOINTMENTS ARE :::: ", appointments);
    serviceChunk.addAppointmentToCentre_s(req.body, centreID).then(centre => {
        if (centre) {
            res.status(200).send({ centre });
            return console.log("user is created");
        }
    }).catch(err => {
        res.status(400).send({
            error: 'A centre already exists...'
        });
    });
};
exports.default = CentreController;
//# sourceMappingURL=CentreController.js.map