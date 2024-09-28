import multer from "multer";
import errors from "../utils/error.js";

export default async function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        return next(
            new errors.AuthenticationError(400, err.message)
        )
    } else if (err) {
        return next(
            new errors.AuthenticationError(400, err.message)
        )
    }
    next();
};