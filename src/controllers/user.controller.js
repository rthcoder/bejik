import errors from "../utils/error.js";
import User from "../models/user.model.js";
import { UserStatuses } from "../types/types.js";
import { paginationResponse } from "../helpers/pagination.js";
import mongoose from 'mongoose';

const GET = async (req, res, next) => {
    try {
        const id = req?.params?.id;

        if (id) {
            const user = await User.findById(id)
                .select('-updatedAt -deletedAt -__v')
                .populate('company', '_id companyName img createdAt');

            if (!user) {
                return next(new errors.NotFoundError(404, "User not found with given Id!"));
            }

            return res.status(200).json({
                status: 200,
                message: 'Successfully retrieved user!',
                data: user
            });
        }

        const {
            role,
            company,
            status,
            firstName,
            lastName,
            thirdName,
            filterStartDate,
            filterEndDate,
            page = process.DEFAULTS.page,
            limit = process.DEFAULTS.limit
        } = req?.query;

        let skip = (page - 1) * limit;

        const escapeRegex = (text) => {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };

        const isCompanyIdValid = mongoose.Types.ObjectId.isValid(company);

        const filter = {
            ...(role && { role: { $regex: escapeRegex(role), $options: 'i' } }),
            ...(isCompanyIdValid && { company }),
            ...(status && { status: { $regex: escapeRegex(status), $options: 'i' } }),
            ...(firstName && { firstName: { $regex: escapeRegex(firstName), $options: 'i' } }),
            ...(lastName && { lastName: { $regex: escapeRegex(lastName), $options: 'i' } }),
            ...(thirdName && { thirdName: { $regex: escapeRegex(thirdName), $options: 'i' } })
        };

        if (filterStartDate && filterStartDate.includes('_')) {
            const [startDate, endDate] = filterStartDate.split('_');

            if (startDate && endDate) {
                filter.creteadAt = { $gte: new Date(startDate) };
                filter.creteadAt = { $lte: new Date(endDate) };
            }
        }

        if (filterEndDate && filterEndDate.includes('_')) {
            const [startDate, endDate] = filterEndDate.split('_');

            if (startDate && endDate) {
                filter.endDate = { $gte: new Date(startDate) };
                filter.endDate = { $lte: new Date(endDate) };
            }
        }

        const users = await User.find(filter)
            .skip(skip)
            .limit(limit)
            .select('-updatedAt -deletedAt -__v')
            .populate('company', '_id companyName img createdAt');

        const usersCount = await User.countDocuments(filter);

        const pagination = paginationResponse(usersCount, limit, page);

        return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved users!',
            data: users,
            pagination
        });

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
};



const POST = async (req, res, next) => {
    try {
        if (!req?.files?.document) {
            return next(
                new errors.NotFoundError(404, "User document required")
            )
        }
        if (!req?.files?.img) {
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
            status: UserStatuses.ACTIVE
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
        if (!req.body || Object.keys(req.body).length === 0) {
            return next(
                new errors.BadRequestError(400, "For update, you must enter something!")
            );
        }

        const { id } = req.params;
        let { status, endDate } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return next(
                new errors.NotFoundError(404, "User not Found with given Id!")
            );
        }

        if (!endDate) {
            return next(
                new errors.NotFoundError(404, "User not Found with given Id!")
            );
        }

        status = Number(status);

        if (status !== 1 && status !== 0) {
            return next(
                new errors.BadRequestError(400, "Status must be 1 or 0!")
            );
        }

        if (status === 1) {
            status = UserStatuses.ACTIVE;
        }

        else if (status === 0) {
            status = UserStatuses.PASSIVE;
        }

        const updated_user = await User.findByIdAndUpdate(id, {
            status,
            endDate: new Date(endDate),
            updatedAt: new Date()
        }, { new: true });

        return res
            .status(200)
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
                endDate: new Date(),
                status: UserStatuses.PASSIVE
            }
        );

        return res
            .status(200)
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