import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

export default mongoose.model("Company", companySchema);