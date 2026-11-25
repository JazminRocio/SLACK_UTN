import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";


//console.log(ENVIROMENT)
/*const MONGO_URI = 'mongodb://localhost:27017'
const MONGO_DB_NAME = "prueba_bdd"*/

async function connectMongoDB() {
    try {
        await mongoose.connect(
            ENVIROMENT.MONGO_DB_URI + '/' + ENVIROMENT.MONGO_DB_NAME
        )
        console.log("conexion a MongoDB existosa")
    }
    catch (error) {
        console.error('Error critico al conectar a MongoDB', error.message)
        process.exit(1) //creasheo controlado
    }
}

export default connectMongoDB