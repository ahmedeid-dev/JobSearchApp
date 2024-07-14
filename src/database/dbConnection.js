import mongoose from "mongoose";

// db connection with mongoose
const connection = mongoose.connect("mongodb://localhost:27017/jobSearchApp")
    .then(() => {
        console.log("Database connected successfully");
    }).catch(() => {
        console.log("error at connecting database !!!");
    });
export default connection;
