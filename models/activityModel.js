import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        location: String,
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Activities'
    }
);

const activityModel = mongoose.model('Activity', activitySchema);

export default activityModel;