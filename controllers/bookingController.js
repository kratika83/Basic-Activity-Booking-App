import i18n from "../config/i18n.js";
import activityModel from "../models/activityModel.js";
import bookingModel from "../models/bookingModel.js";
import constants from "../utils/constants.js";
import helper from "../utils/helper.js";

const bookActivity = async (req, res) => {
    try {
        const activityId = req.body.activity || req.body.activityId;
        const activity = await activityModel.findById(activityId);
        if (!activity) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_CONTENT_NOT_FOUND,
                i18n.__("lang_record_not_found")
            );
        }

        const booking = new bookingModel({
            user: req.user.id,
            activity: activityId
        });

        await booking.save();
        return helper.returnTrueResponse(
            req,
            res,
            constants.CONST_RESP_CODE_OK,
            i18n.__("lang_book_activity_success"),
            booking
        );
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ user: req.user.id }).populate('activity');
        if (!bookings) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_CONTENT_NOT_FOUND,
                i18n.__("lang_record_not_found")
            );
        }

        return helper.returnTrueResponse(
            req,
            res,
            constants.CONST_RESP_CODE_OK,
            i18n.__("lang_record_found"),
            bookings
        );
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

let bookingController = {
    bookActivity: bookActivity,
    getMyBookings: getMyBookings
};

export default bookingController;