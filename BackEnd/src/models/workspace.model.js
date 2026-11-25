import mongoose from "mongoose";


const workspaceSchema = new mongoose.Schema(
    {
        fecha_creacion: {
            type: Date,
            default: Date.now,
            require: true
        },
        nombre: {
            type: String,
            require: true
        },
        descripcion: {
            type: String,
            require: true
        }
    }
)

export const WORKSPACE_COLLECTION_NAME = "Espacio_de_trabajos"

const Workspace = mongoose.model(WORKSPACE_COLLECTION_NAME, workspaceSchema)

export default Workspace