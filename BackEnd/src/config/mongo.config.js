import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";


let connectionPromise = null

async function connectMongoDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(
            `${ENVIROMENT.MONGO_DB_URI}/${ENVIROMENT.MONGO_DB_NAME}`,
            {
                serverSelectionTimeoutMS: 10000
            }
        ).catch(error => {
            connectionPromise = null;
            throw error;
        });
    }
    await connectionPromise;
    return mongoose.connection
}

export default connectMongoDB