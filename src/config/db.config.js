import mongoose from "mongoose";

async function db() {
    try {
        mongoose.connect(`${process.env.MONGO_DB_URL}`)
        console.log("Connected to MongoDb database");
    } catch (error) {
        console.log("MongoDb Error ---> " + error.message)
    }

}
export default db