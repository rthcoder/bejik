import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    third_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    start_day_of_work: {
        type: Date,
        default: Date.now,
        required: true
    },
    end_day_of_work: {
        type: Date,
        default: null
    },
    company_name: {
        type: Types.ObjectId,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    user_document: {
        type: String,
        required: true
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


export default mongoose.model("User", userSchema);