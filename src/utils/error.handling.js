import fs from "fs";

const server_errors = (error, req, res, next) => {
    console.log(error);



    fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${error.name}__${error.message}\n`)

    if (error.name == 'ValidationError') {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    };


    if (error.status != 500) {
        error.status = error.status ? error.status : 404
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    };


    return res.status(error.status).json({
        status: error.status,
        message: 'Internal Server Error',
        errorName: error.name,
        error: true,
    })
}

export default server_errors;