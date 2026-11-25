import mongoose, { now } from "mongoose";
import { USER_COLLECTION_NAME } from "./user.model.js";
import { WORKSPACE_COLLECTION_NAME } from "./workspace.model.js";

const member_schema = new mongoose.Schema(
    {
        id_usuario: {
            type: mongoose.Schema.Types.ObjectId, //EL TIPO DE DATO DE ID
            required: true,
            ref: USER_COLLECTION_NAME //La coleccion a la que le hacemos referencia
        },
        id_espacio_trabajo: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: WORKSPACE_COLLECTION_NAME
        },
        rol: {
            type: String,
            enum: ['user', 'admin', 'owner'],
            default: 'user'
        },
        fecha_creacion: {
            type: Date,
            default: Date.now
        }
    }
)

export const MEMBER_COLLECTION_NAME = 'Miembro'
const Member = mongoose.model(MEMBER_COLLECTION_NAME, member_schema)

export default Member