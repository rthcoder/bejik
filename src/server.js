import cors from "cors";
import "./config/config.js";
import express from 'express';
import server_errors from "./utils/error.handling.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
    app.use(server_errors);
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}();