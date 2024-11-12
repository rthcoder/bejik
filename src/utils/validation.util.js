import JOI from "joi";

const phoneNumberPattern = /^998[389][012345789][0-9]{7}$/;

const userValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().required().messages({ 'string.base': 'Invalid firstname!' }),
        lastName: JOI.string().required().messages({ 'string.base': 'Invalid lastname!' }),
        thirdName: JOI.string().required().messages({ 'string.base': 'Invalid thirdname!' }),
        phoneNumber: JOI.string().pattern(phoneNumberPattern).required().messages({ 'string.pattern.base': 'Invalid phone number!' }),
        role: JOI.string().required().messages({ 'string.base': 'Invalid role!' }),
        company: JOI.string().required().messages({ 'string.base': 'Invalid company!' }),
        startDate: JOI.date().iso().required().messages({ 'date.base': 'Invalid start date!' }),
    })
});

const staffValidation = JOI.object({
    body: JOI.object({
        firstName: JOI.string().required().messages({ 'string.base': 'Invalid firstname!' }),
        lastName: JOI.string().required().messages({ 'string.base': 'Invalid lastname!' }),
        thirdName: JOI.string().required().messages({ 'string.base': 'Invalid thirdname!' }),
        role: JOI.string().required().messages({ 'string.base': 'Invalid role!' }),
        phoneNumber: JOI.string().pattern(phoneNumberPattern).required().messages({ 'string.pattern.base': 'Invalid phone number!' }),
        login: JOI.string().required().min(6).max(15).messages({ 'string.base': 'Invalid login!' }),
        password: JOI.string().required().min(8).max(12).messages({ 'string.base': 'Password must be between 8 and 12 characters!' })
    })
});

const companyValidation = JOI.object({
    body: JOI.object({
        companyName: JOI.string().required().min(3).max(50).messages({ 'string.base': 'Invalid company name!' }),
        img: JOI.string().required().messages({ 'string.base': 'Invalid image' }),
    })
});

export default {
    userValidation,
    staffValidation,
    companyValidation,
};
