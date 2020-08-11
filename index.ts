import express from 'express';
const path = require("path");
const PORT = 3000;
import bodyParser from 'body-parser';
const cors = require('cors');
require('dotenv').config();
require('./app/passport');

import "reflect-metadata";
import { routes as apiRoutes } from './app/routes/index';

//DB
require("./app/config/DBConnect");

// APP INIT
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));

// ENDPOINTS
app.use('/', apiRoutes);

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