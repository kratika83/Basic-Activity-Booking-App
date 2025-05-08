import activityController from '../controllers/activityController.js';
import validators from './../utils/validator.js';
import express from 'express';
const activityRouter = express.Router();

activityRouter.get(
    "/",
    activityController.getAllActivities
);

export default activityRouter;