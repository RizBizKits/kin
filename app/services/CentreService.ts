import { CentresModel } from "../models/CentresModel";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import {UserModel} from "../models/UserModel";

export class CentreService {
    async get(): Promise<CentresModel[] | null> {
        // Get users from database
        try {
            const centreRepository = getRepository(CentresModel);
            const centres = await centreRepository.find({});
            return centres;
        }
        catch (error) {
            return null
        }
    }

    async add(data:any): Promise<CentresModel | null> {
        try {
            const centreRepository = getRepository(CentresModel);
            const centre = new CentresModel();
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

            const savedCentre = await centreRepository.save(centre);
            return savedCentre;

        } catch (e) {
            console.log("Can't add centre....")
            console.log(e);
            return Promise.reject(new Error("User already exists!"));
        }
    }
}
