import errors from "../utils/error.js";
import User from "../models/user.model.js";
import UserStatuses from "../types/types.js";


const GET = async (req, res, next) => {
    try {

        const id = req?.params?.id

        if (id) {
            const user = await User.findById(
                {
                    _id: id,
                    deletedAt: null
                }
            ).select('-updatedAt -deletedAt -__v')
                ;

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

        const users = await User.find(
            {
                deletedAt: null
            }
        ).select('-updatedAt -deletedAt -__v');

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
        if (!req.files.document) {
            return next(
                new errors.NotFoundError(404, "User document required")
            )
        }
        if (!req.files.img) {
            return next(
                new errors.NotFoundError(404, "User image required!")
            )
        }

        const document = req.files.document[0].filename
        const img = req.files.img[0].filename

        const new_user = await User.create({
            ...req?.body,
            startDate: new Date(req?.body?.startDate),
            document,
            img,
            status: UserStatuses.UserStatuses.ACTIVE
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

const PUT = async (req, res, next) => {
    try {

        if (!req?.body?.length) {
            return next(
                new errors.BadRequestError(404, "For update must enter someting!")
            )
        }

        const { id } = req?.params
        const { status } = req?.body

        const user = await User.findById(id)


        if (!user) {
            return next(
                new errors.NotFoundError(404, "User not Found with given Id!")
            )
        }

        const updated_user = await User.findByIdAndUpdate(id, {
            status: status,
            updatedAt: new Date()
        });

        return res
            .status(201)
            .json({
                status: 200,
                message: 'The user successfully updated!',
                data: updated_user
            });


    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

const DELETE = async (req, res, next) => {
    try {
        const { id } = req?.params

        const user = await User.findById(id)

        if (!user) {
            return next(
                new errors.NotFoundError(404, "Staff not Found with given Id!")
            )
        }

        await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                deletedAt: new Date(),
                endDate: newDate(),
                status: UserStatuses.UserStatuses.PASSIVE
            }
        );

        return res
            .status(201)
            .json({
                status: 200,
                message: 'The user successfully deleted!',
                data: null
            });


    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}


export default {
    GET,
    POST,
    PUT,
    DELETE
}