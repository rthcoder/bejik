import JOI from "joi";

const phoneNumberPattern = /^998[389][012345789][0-9]{7}$/

const userValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().required().min(3).max(25),
        lastName: JOI.string().required().min(6).max(25),
        thirdName: JOI.string().required().min(6).max(35),
        phoneNumber: JOI.string().required().regex(phoneNumberPattern),
        role: JOI.string().required().min(3).max(25),
        // document: JOI.string().required(),
        company: JOI.string().required(),
        startDate: JOI.date().iso().required(),
        // img: JOI.string().required(),
    })
});

const staffValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().required().min(3).max(25).alphanum(),
        lastName: JOI.string().required().min(6).max(25).alphanum(),
        thirdName: JOI.string().required().min(5).max(35).alphanum(),
        role: JOI.string().required().min(2).max(10),
        phoneNumber: JOI.string().required().regex(phoneNumberPattern),
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