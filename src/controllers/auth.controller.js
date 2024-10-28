import bcrypt from "bcryptjs";
import errors from "../utils/error.js";
import Staff from "../models/staff.model.js";
import JWT from "../services/jwt.js"

const LOGIN = async (req, res, next) => {
    try {
        const { login, password } = req?.body

        if (!(login || password)) {
            return next(
                new errors.AuthenticationError(400, "Input is required")
            )
        }

        const agent = req.headers['user-agent']
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        const staff = await Staff.findOne({ login })

        if (!(staff && (await bcrypt.compare(password, staff.password)))) {
            return next(
                new errors.AuthorizationError(401, "Invalid username or password")
            )
        }

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The user successfully sign in!',
                token: JWT.sign({ staffId: staff._id, ip, agent }),
                data: staff
            })

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
};

const ME = async (req, res, next) => {
    try {
        const id = req?.staffId

        const staff = await Staff.findOne({ _id: id })

        delete staff.password

        return res
            .status(200)
            .json({
                status: 200,
                message: 'Get me!',
                data: staff
            })

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

export default {
    LOGIN,
    ME
};