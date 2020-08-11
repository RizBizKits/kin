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
exports.default = CentreController;
//# sourceMappingURL=CentreController.js.map