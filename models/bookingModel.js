import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Bookings'
    }
);

const bookingModel = mongoose.model('bookingSchema', bookingSchema);

export default bookingModel;