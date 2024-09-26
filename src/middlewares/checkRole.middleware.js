import errors from "../utils/error.js";
import { Roles } from '../types/role.type.js'

export default async function (req, res, next) {
    try {
        const role = req?.role

        if (role !== Roles.ADMIN || role !== Roles.HR) {
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