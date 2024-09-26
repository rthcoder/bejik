import JOI from "joi";

const phoneNumberPattern = /^998[389][012345789][0-9]{7}$/

const userValidation = JOI.object({
    body: JOI.object({
        first_name: JOI.string().required().min(3).max(25).alphanum(),
        last_name: JOI.string().required().min(6).max(25).alphanum(),
        third_name: JOI.string().required().min(15).max(35).alphanum(),
        phone_number: JOI.string().required().regex(phoneNumberPattern),
        user_role: JOI.string().required().min(3).max(25),
        start_day_of_work: JOI.date().iso().required(),
        end_day_of_work: JOI.date().iso().required(),
        company_name: JOI.string().required().min(3).max(25),
        img: JOI.string().required(),
        user_document: JOI.string().required(),

    })
});

const staffValidation = JOI.object({
    body: JOI.object({
        first_name: JOI.string().required().min(3).max(25).alphanum(),
        last_name: JOI.string().required().min(6).max(25).alphanum(),
        third_name: JOI.string().required().min(15).max(35).alphanum(),
        phone_number: JOI.string().required().regex(phoneNumberPattern),
        login: JOI.date().required().min(6).max(15),
        password: JOI.date().required().min(8).max(12)
    })
});

const companyValidation = JOI.object({
    body: JOI.object({
        company_name: JOI.string().required().min(3).max(50),
        img: JOI.string().required(),
    })
});

export default {
    userValidation,
    staffValidation,
    companyValidation,
}