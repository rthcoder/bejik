import fs from "fs";
import cors from "cors";
import "./config/config.js";
import express from 'express';
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.get('/', (req, res) => res.send("Hello"));

import database from "./config/db.config.js";

import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import staffRouter from "./routers/staff.router.js";
import companyRouter from "./routers/company.router.js";
import clientSideRouter from "./routers/clientSide.router.js"


!async function () {
    try {
        database();
        app.use(authRouter);
        app.use(userRouter);
        app.use(staffRouter);
        app.use(companyRouter);
        app.use(clientSideRouter)
    } catch (error) {
        console.log(error);
    }
    app.use((err, req, res, next) => {
        fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${err.name}__${err.message}\n`);

        console.error(err);

        let status = err.status || 500;
        let message = err.message || 'Internal Server Error';

        switch (err.name) {
            case 'ValidationError':
                status = 400;
                message = err.message || 'Validation Error';
                break;
            case 'NotFoundError':
                status = 404;
                message = err.message || 'Resource Not Found';
                break;
            case 'AuthorizationError':
                status = 403;
                message = err.message || 'Forbidden';
                break;
            case 'AuthenticationError':
                status = 401;
                message = err.message || 'Unauthorized';
                break;
            case 'BadRequestError':
                status = 400;
                message = err.message || 'Bad Request';
                break;
            case 'MulterError':
                status = 400;
                message = err.message || 'File Upload Error';
                break;
            case 'ConflictError':
                status = 409;
                message = err.message || 'ConflictError';
                break;
            default:
                status = 500;
                message = 'Internal Server Error';
        }

        res.status(status).json({
            status: status,
            message: message,
            errorName: err.name || 'Error',
        });
    });
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}();
