import errors from "../utils/error.js";
import validation from "../utils/validation.util.js";

export default (req, res, next) => {
    try {

        if (req.method === 'POST' && req.url == '/api/v1/staffs') {
            console.log('keldim');


            const { error } = validation.staffValidation.validate({ body: req.body })

            if (error) {
                return next(
                    new errors.ValidationError(400, error.message)
                )
            }
        }

        return next()

    }
    catch (error) {
        console.log(error.message);
        return next(error)
    }
};