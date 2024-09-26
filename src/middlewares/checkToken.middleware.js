import errors from "../utils/error.js";
import Staff from "../models/staff.model.js";
import JWT from "../services/JWT.service.js";

export default async function (req, res, next) {
    try {
        const token = request.headers.authorization?.replace(/^(bearer)\s/i, '')

        if (!token) {
            return next(
                new errors.AuthorizationError(401, 'User is un authorized')
            )
        };

        let staffs = await Staff.find();

        const { staff_id, agent, ip } = JWT.verify(token);

        if (!(req.headers['user-agent'] == agent)) {
            return next(
                new errors.AuthorizationError(400, 'Token is invalid')
            )
        };

        if (!(req.headers['x-forwarded-for'] || req.socket.remoteAddress == ip)) {
            return next(
                new errors.AuthorizationError(400, 'Token is invalid')
            )
        };

        const staff = staffs.some(staff => staff._id == staff_id);

        if (!staff) {
            return next(
                new errors.AuthorizationError(403, 'The token invalid')
            )
        };

        req.staff_id = staff_id;
        req.role = staff?.role;

        next();

    } catch (error) {
        console.log(error.message);
        return next(error)
    }
};