"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ORMSpecs = require("../../ormconfig");
class DBConnect {
    constructor(details) {
        this._dbsuccess = undefined;
        typeorm_1.createConnection(details).then(connection => {
            this._dbsuccess = connection;
            console.log("connected");
        }).catch(err => console.log(err));
    }
}
exports.dbConnector = new DBConnect(ORMSpecs);
module.exports.default = exports.dbConnector;
//# sourceMappingURL=DBConnect.js.map