import bcrypt from "bcryptjs";
import errors from "../utils/error.js";
import User from "../models/user.model.js";
import JWT from "../services/jwt.js"

const LOGIN = async (req, res, next) => {
    try {
        const { username, password } = req?.body

        if (!(username || password)) {
            return next(
                new errors.ValidationError(400, "Input is required")
            )
        }

        const agent = req.headers['user-agent']
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        const user = await User.findOne({ username })

        if (!(user && (await bcrypt.compare(password, user.password)))) {
            return next(
                new errors.AuthorizationError(400, "Invalid username or password")
            )
        }

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The user successfully sign in!',
                token: JWT.sign({ user_id: user._id, ip, agent }),
                data: user
            })

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
};

export default {
    LOGIN,
}