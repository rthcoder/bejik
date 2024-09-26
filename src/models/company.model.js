import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

export default mongoose.model("Company", companySchema);