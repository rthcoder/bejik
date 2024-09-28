import errors from "../utils/error.js";
import Roles from '../types/types.js'

export default async function (req, res, next) {
    try {
        const role = req?.role

        if (role !== Roles.ADMIN || role !== Roles.Roles.HR) {
            return next(
                new errors.AuthenticationError(400, "Access denied")
            )
        }

        next();
    } catch (error) {
        console.log(error.message);
        return next(error)
    }
};