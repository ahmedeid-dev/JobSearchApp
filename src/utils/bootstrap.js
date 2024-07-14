process.on('uncaughtException', (error) => { console.log("uncaughtException Error Occured", error) })
import express from 'express'
import appError from './appError.js';
import jobRouter from "../module/job/job.routes.js";
import connection from "../database/dbConnection.js";
import userRouter from "../module/user/user.routes.js";
import globalError from "../middleware/globalError.js";
import companyRouter from "../module/company/company.routes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const bootstrap = async () => {
    dotenv.config();
    const port = process.env.PORT || 3000;
    const app = express()
    app.use(express.json())
    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/jobs", jobRouter)
    app.use("/users", userRouter)
    app.use("/company", companyRouter)

    app.get('/', (req, res, next) => res.status(200).json({ message: 'Hello World!' }))
    app.use("*", (req, res, next) => next(new appError("Not Found", 404)))
    app.use(globalError)

    process.on('unhandledRejection', (err) => {
        console.log("unhandledRejection Error Occured", err)
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

export default bootstrap