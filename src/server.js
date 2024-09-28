import fs from "fs";
import path from "path";
import cors from "cors";
import "./config/config.js";
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/public/documents/', express.static(path.join(process.cwd(), 'public', 'documents')));
app.use('/public/images/', express.static(path.join(process.cwd(), 'public', 'images')));

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.get('/', (req, res) => res.send("Hello"));

import database from "./config/db.config.js";

import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import staffRouter from "./routers/staff.router.js";

!async function () {
    try {
        database();
        app.use(authRouter);
        app.use(userRouter);
        app.use(staffRouter);
    } catch (error) {
        console.log(error);
    }
    app.use((err, req, res, next) => {
        fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${err.name}__${err.message}\n`);

        // Xatolikni konsolga chiqarish (server loglari uchun)
        console.error(err);

        // Default status va xabar
        let status = err.status || 500;
        let message = err.message || 'Internal Server Error';

        // Maxsus xatolik turlari uchun qayta belgilash
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
            // MulterError va boshqa xatolik turlari
            case 'MulterError':
                status = 400;
                message = err.message || 'File Upload Error';
                break;
            default:
                status = 500;
                message = 'Internal Server Error';
        }

        // Javobni yuborish
        res.status(status).json({
            status: status,
            message: message,
            errorName: err.name || 'Error',
        });
    });
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}();