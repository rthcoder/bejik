import JOI from "joi";

const phoneNumberPattern = /^998[389][012345789][0-9]{7}$/

const userValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().min(3).max(25),
        lastName: JOI.string().min(6).max(25),
        thirdName: JOI.string().min(6).max(35),
        phoneNumber: JOI.string(),
        role: JOI.string().required().min(3).max(25),
        company: JOI.string().required(),
        startDate: JOI.date().iso().required(),
    })
});

const staffValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().min(3).max(25),
        lastName: JOI.string().min(6).max(25),
        thirdName: JOI.string().min(5).max(35),
        role: JOI.string().required().min(2).max(10),
        phoneNumber: JOI.string(),
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