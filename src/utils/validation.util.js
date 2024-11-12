import JOI from "joi";

const userValidation = JOI.object({
    body: JOI.object({
        role: JOI.string().required().min(3).max(25),
        company: JOI.string().required(),
        startDate: JOI.date().iso().required(),
    })
});

const staffValidation = JOI.object({
    body: JOI.object({
        role: JOI.string().required().min(2).max(10),
        login: JOI.string().required().min(6).max(15),
        password: JOI.string().required().min(8).max(12)
    })
});

const companyValidation = JOI.object({
    body: JOI.object({
        companyName: JOI.string().required().min(3).max(50),
        img: JOI.string().required(),
    })
});

export default {
    userValidation,
    staffValidation,
    companyValidation,
}