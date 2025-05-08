import dotenv from "dotenv";
dotenv.config();

// Database connection
import connect from "./config/db.js";
connect();

// custom created files
import express from "express";
import bodyParser from "body-parser";
import constants from "./utils/constants.js";
import i18n from "./config/i18n.js";

// server configuration section
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

import authRouter from './routes/authRoute.js';
app.use('/v1/api/auth', authRouter);

import activityRouter from './routes/activityRoute.js';
app.use('/v1/api/activities', activityRouter);

import bookingRouter from './routes/bookingRoute.js';
app.use('/v1/api/bookings', bookingRouter);

app.get("/", (req, res) => {
    return res
        .status(constants.CONST_RESP_CODE_OK)
        .send(i18n.__("lang_forbidden"));
});

app.listen(port, () => {
    console.log(`Server run on port: ${port}`);
});