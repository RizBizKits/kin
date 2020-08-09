import {Connection, createConnection} from "typeorm";
const ORMSpecs = require("../../ormconfig");

class DBConnect {

    _dbsuccess:Connection = undefined;

    constructor(details) {
        createConnection(details).then(connection => {
            this._dbsuccess =  connection;
            console.log("connected")
        }).catch(err => console.log(err));
    }
}

export const dbConnector = new DBConnect(ORMSpecs);
module.exports.default = dbConnector;
