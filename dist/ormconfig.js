"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./app/models/UserModel");
const RankingsModel_1 = require("./app/models/RankingsModel");
const CentresModel_1 = require("./app/models/CentresModel");
const AppointmentsModel_1 = require("./app/models/AppointmentsModel");
const CabinetModel_1 = require("./app/models/CabinetModel");
const BadgesModel_1 = require("./app/models/BadgesModel");
let c = {
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [
        UserModel_1.UserModel,
        RankingsModel_1.RankingsModel,
        CentresModel_1.CentresModel,
        AppointmentsModel_1.AppointmentsModel,
        CabinetModel_1.CabinetModel,
        BadgesModel_1.BadgesModel
    ],
    migrations: ["migrations/*.js"],
    cli: {
        migrationsDir: "orm_migrations"
    }
};
//
// let c = {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     synchronize: false,
//     logging: false,
//     entities: [
//         UserModel
//     ],
//     migrations: ["orm_migrations/*.js"],
//     cli: {
//         migrationsDir: "orm_migrations"
//     }
// };
module.exports = c;
//# sourceMappingURL=ormconfig.js.map