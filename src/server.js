import fs from "fs";
import cors from "cors";
import "./config/config.js";
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(cors());
app.use(express.json());

//cors settings
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

//test for working or not server
app.get('/', (req, res) => res.send("Hello"));

//initialize database 
import database from "./config/db.config.js";

// routes
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js"

//start server
!async function () {
    try {
        database();
        app.use(authRouter);
        app.use(userRouter);
    } catch (error) {
        console.log(error);
    }
    app.use((error, req, res, next) => {

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
    });
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}();