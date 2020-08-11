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
const CentresModel_1 = require("../models/CentresModel");
const typeorm_1 = require("typeorm");
class CentreService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get users from database
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                const centres = yield centreRepository.find({});
                return centres;
            }
            catch (error) {
                return null;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const centreRepository = typeorm_1.getRepository(CentresModel_1.CentresModel);
                const centre = new CentresModel_1.CentresModel();
                // const {centreName,houseNumber,streetName,town,postcode,contactNumber,email,websiteURL} = centre
                centre.centreName = data.centreName;
                centre.houseNumber = data.houseNumber;
                centre.streetName = data.streetName;
                centre.town = data.town;
                centre.postcode = data.postcode;
                centre.contactNumber = data.contactNumber;
                centre.email = data.email;
                centre.websiteURL = data.websiteURL;
                console.log("done adding centre");
                const savedCentre = yield centreRepository.save(centre);
                return savedCentre;
            }
            catch (e) {
                console.log("Can't add centre....");
                console.log(e);
                return Promise.reject(new Error("User already exists!"));
            }
        });
    }
}
exports.CentreService = CentreService;
//# sourceMappingURL=CentreService.js.map