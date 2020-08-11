"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const PORT = 3000;
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
require('dotenv').config();
require('./app/passport');
require("reflect-metadata");
const index_1 = require("./app/routes/index");
//DB
require("./app/config/DBConnect");
// APP INIT
const app = express_1.default();
app.use(cors());
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
// ENDPOINTS
app.use('/', index_1.routes);
app.get('/', (req, res) => {
    res.send('The seeedulous hyena ate the antelope!');
});
// START
app.listen(PORT, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map