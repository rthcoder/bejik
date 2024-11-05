import fs from "fs";
import path from "path"
import errors from "../utils/error.js";
import Company from "../models/company.model.js";
import { paginationResponse } from "../helpers/pagination.js";

const GET = async (req, res, next) => {
    try {
        if (req.params.id) {
            const company = await Company.findById(
                {
                    _id: req.params.id,
                }
            ).select('-deletedAt -updatedAt -__v');

            if (!company) {
                return next(
                    new errors.NotFoundError(404, "Company not Found with given Id!")
                )
            };

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'successfully read Staff!',
                    data: company
                });
        };

        const { company, page = process.DEFAULTS.page, limit = process.DEFAULTS.limit } = req?.query;

        const escapeRegex = (text) => {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };

        const filter = {
            ...(company && { company: { $regex: escapeRegex(company), $options: 'i' } }),
        }

        const companyCount = await Company.find()

        const skip = (page - 1) * limit

        const companies = await Company.find(filter).skip(skip).limit(limit).select('-deletedAt -updatedAt -__v');
        const pagination = paginationResponse(companyCount.length, limit, page)

        return res
            .status(200)
            .json({
                status: 200,
                message: 'successfully read companies!',
                data: companies, pagination
            });

    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

const POST = async (req, res, next) => {
    try {

        const { companyName } = req?.body

        const companyExists = await Company.findOne(
            {
                companyName
            }
        )

        if (companyExists) {
            return next(
                new errors.ConflictError(409, "Company already exists!")
            )
        }

        if (!req?.files?.logo) {
            return next(
                new errors.NotFoundError(404, "Company logo image required!")
            )
        }

        const img = req.files.logo[0].filename

        const newCompany = await Company.create({
            companyName,
            img,
        });

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The company successfully created!',
                data: newCompany
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

        const { companyName } = req.body;
        const { id } = req.params;

        const company = await Company.findById(id);
        if (!company) {
            return next(new errors.NotFoundError(404, "Company not Found with given Id!"));
        }

        console.log(req.files?.logo);

        // Eski rasmni o'chirish
        if (req.files?.logo) {
            const oldImagePath = path.join(process.cwd(), 'uploads/images/', company.img);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Failed to delete old image:', err);
            });
        }

        const img = req.files?.logo?.[0]?.filename;

        const updatedCompany = await Company.findByIdAndUpdate(
            { _id: id },
            {
                companyName,
                img: img ? img : company.img,
                updatedAt: new Date(),
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: 'The company successfully updated!',
            data: updatedCompany,
        });
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
};

const DELETE = async (req, res, next) => {
    try {
        const { id } = req?.params

        const company = await Company.findById(id)

        if (!company) {
            return next(
                new errors.NotFoundError(404, "Company not Found with given Id!")
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
                message: 'The company successfully deleted!',
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