import Roles from '../types/types.js'
import errors from "../utils/error.js";

export default async function (req, res, next) {
    try {
        const role = req?.role

        console.log(Roles.Roles.HR, Roles.Roles.ADMIN);


        if (role !== Roles.Roles.ADMIN && role !== Roles.Roles.HR) {
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