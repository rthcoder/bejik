import errors from "../utils/error.js";
import User from "../models/user.model.js"

const GET = async (req, res, next) => {
    try {

        if (req.params.id) {
            const user = await User.findById(req.params.id);

            if (!user) {

                return next(
                    new errors.NotFoundError(404, "User not Found with given Id!")
                )
            };

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'successfully read user!',
                    data: user
                });
        };

        const users = await User.find();

        return res
            .status(200)
            .json({
                status: 200,
                message: 'successfully read users!',
                data: users
            });

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

const POST = async (req, res, next) => {
    try {
        const { first_name, last_name, login, password, phone_number, user_role, start_day_of_work, end_day_of_work, profile_img, user_command } = req?.body

        const new_user = await User.create({
            first_name, last_name, login, password, phone_number, user_role, start_day_of_work, end_day_of_work, profile_img, user_command
        });

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The user successfully created!',
                data: new_user
            });


    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

export default {
    GET,
    POST
}