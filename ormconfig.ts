import {UserModel} from "./app/models/UserModel";
import {RankingsModel} from "./app/models/RankingsModel";
import {CentresModel} from "./app/models/CentresModel";
import {AppointmentsModel} from "./app/models/AppointmentsModel";
import {CabinetModel} from "./app/models/CabinetModel";
import {BadgesModel} from "./app/models/BadgesModel";



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
        UserModel,
        RankingsModel,
        CentresModel,
        AppointmentsModel,
        CabinetModel,
        BadgesModel
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

