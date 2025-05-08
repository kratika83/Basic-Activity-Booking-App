import bookingController from '../controllers/bookingController.js';
import validators from '../utils/validator.js';
import authMiddleware from './../middlewares/authMiddleware.js';
import express from 'express';
const bookingRouter = express.Router();

bookingRouter.post(
    "/book-activity",
    authMiddleware,
    validators.joiBookingValidation,
    bookingController.bookActivity
);

bookingRouter.get(
    "/",
    authMiddleware,
    bookingController.getMyBookings
);

export default bookingRouter;