import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        fecha_creacion: {
            type: Date,
            default: Date.now,
            require: true
        },
        activo: {
            type: Boolean,
            default: true
        },
        email_verficado: {
            type: Boolean,
            default: false
        }
    }
)

export const USER_COLLECTION_NAME = 'Usuario'

const User = mongoose.model(USER_COLLECTION_NAME, userSchema)

export default User