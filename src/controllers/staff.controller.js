import errors from "../utils/error.js";
import Staff from "../models/staff.model.js"

const GET = async (req, res, next) => {
    try {
        if (req.params.id) {
            const staff = await Staff.findById(
                {
                    _id: req.params.id,
                    deletedAt: null
                }
            ).select('-deletedAt -updatedAt -password');

            if (!staff) {
                return next(
                    new errors.NotFoundError(404, "Staff not Found with given Id!")
                )
            };

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'successfully read Staff!',
                    data: staff
                });
        };

        const staffs = await Staff.find({ deletedAt: null }).select('-deletedAt -updatedAt -password');

        return res
            .status(200)
            .json({
                status: 200,
                message: 'successfully read Staffs!',
                data: staffs
            });

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

const POST = async (req, res, next) => {
    try {

        const { login } = req?.body

        const staffExist = await Staff.findOne(
            {
                login
            }
        )

        if (staffExist) {
            return next(
                new errors.ConflictError(409, "Login already exists!")
            )
        }

        const new_staff = await Staff.create({
            ...req?.body
        });

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The staff successfully created!',
                data: new_staff
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

        const staff = await Staff.findById(id)


        if (!staff) {
            return next(
                new errors.NotFoundError(404, "Staff not Found with given Id!")
            )
        }

        const updated_staff = await Staff.findByIdAndUpdate(
            {
                _id: id
            },
            {
                ...req?.body,
                updatedAt: new Date()
            });

        return res
            .status(201)
            .json({
                status: 200,
                message: 'The staff successfully updated!',
                data: updated_staff
            });


    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

const DELETE = async (req, res, next) => {
    try {
        const { id } = req?.params

        const staff = await Staff.findById(id)

        if (!staff) {
            return next(
                new errors.NotFoundError(404, "Staff not Found with given Id!")
            )
        }

        await Staff.findByIdAndUpdate(
            {
                _id: id
            },
            {
                deletedAt: new Date()
            }
        );

        return res
            .status(201)
            .json({
                status: 200,
                message: 'The staff successfully deleted!',
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