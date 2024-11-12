import errors from "../utils/error.js";
import Staff from "../models/staff.model.js"
import { paginationResponse } from "../helpers/pagination.js";
import bcrypt from "bcryptjs";


const GET = async (req, res, next) => {
    try {
        if (req.params.id) {
            const staff = await Staff.findById(
                {
                    _id: req.params.id,
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

        const { role, company, login, firstName, lastName, phoneNumber, thirdName, filterDate, page = process.DEFAULTS.page, limit = process.DEFAULTS.limit } = req?.query;

        const escapeRegex = (text) => {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };

        const filter = {
            ...(role && { role: { $regex: escapeRegex(role), $options: 'i' } }),
            ...(company && { company }),
            ...(login && { login: { $regex: escapeRegex(login), $options: 'i' } }),
            ...(firstName && { firstName: { $regex: escapeRegex(firstName), $options: 'i' } }),
            ...(lastName && { lastName: { $regex: escapeRegex(lastName), $options: 'i' } }),
            ...(thirdName && { thirdName: { $regex: escapeRegex(thirdName), $options: 'i' } }),
            ...(phoneNumber && { phoneNumber: { $regex: escapeRegex(phoneNumber), $options: 'i' } }),
        }

        if (filterDate && filterDate.includes('_')) {
            const [startDate, endDate] = filterDate.split('_');

            if (startDate && endDate) {
                filter.creteadAt = { $gte: new Date(startDate) };
                filter.creteadAt = { $lte: new Date(endDate) };
            }
        }

        const skip = (page - 1) * limit


        const staffs = await Staff.find(filter).skip(skip).limit(limit).select('-deletedAt -updatedAt -password');
        const pagination = paginationResponse(staffs.length, limit, page)


        return res
            .status(200)
            .json({
                status: 200,
                message: 'successfully read Staffs!',
                data: staffs, pagination
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
                login,
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

        if (!req.body || Object.keys(req.body).length === 0) {
            return next(
                new errors.BadRequestError(400, "For update, you must enter something!")
            );
        }

        const { id } = req?.params

        const staff = await Staff.findById(id)


        if (!staff) {
            return next(
                new errors.NotFoundError(404, "Staff not Found with given Id!")
            )
        }

        let password

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(req.body.password, salt);
        }

        const updated_staff = await Staff.findByIdAndUpdate(
            {
                _id: id
            },
            {
                ...req?.body,
                password: password,
                updatedAt: new Date()
            }
        );

        updated_staff.save()

        return res
            .status(200)
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
            .status(200)
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