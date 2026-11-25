import express, { request, response } from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import workspace_repository from '../repositories/workspace.repository.js'
import member_repository from '../repositories/member.repository.js'
import channel_router from './channels.router.js'
import ServerError from '../utils/error.util.js'
import workspaceMiddleware from '../middleware/workspace.middleware.js'

const workspace_router = express.Router()

/*
    CLASE 20

    (Authentified)  GET /api/workspace
    Traer la listsa de esspacios de trabajo asociadas a ese usuario (basicamente sus membresias), con el rol de membresia en cada espacio de trabajo
 */


workspace_router.get(
    '/',
    authMiddleware,
    async (request, response) => {
        const workspaces_obtenidos = await member_repository.getAllWorkspaceByUserId
            (request.user.id)
        return response.status(200).send({
            ok: true,
            message: "Obtenidos todos los datos",
            status: 200,
            data: {
                workspaces: workspaces_obtenidos
            }
        })
    }
)




/*
Route /api/workspace
    POST=> crear espacio de trabajo y membresia de creaedor
    GET=> Obtener lista de espacios de trabajo asociados a un usuario (buscamos las membresias asociadas a un cierto usuario)
    GET /:workspace_id => obtener los datos de un cierto espacio de trabajo
*/
workspace_router.post(
    '/',
    authMiddleware,
    async (request, response) => {
        //quien quiere hacer esta operacion?
        console.log('[CREATE WORKSPACE]', request.user)
        const { name, description } = request.body

        /*
        Validar que este en nombre del workspace
        Crear el espacio de trabajo
        Crear la membresia a nombre del usuario creador con rol de owner
        */

        const workspace_created = await workspace_repository.crearEspacioDeTrabajo(name, description)
        const owner_membership = await member_repository.create(
            request.user.id,
            workspace_created._id,
            'owner'
        )
        response.status(201).send(
            {
                ok: true,
                status: 201,
                message: 'por ahora todo bien',
                data: {
                    workspace_created,
                    owner_membership
                }
            }
        )
    })

workspace_router.get(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware([]),//le paso el rol valido
    async (request, response) => {
        /* const { workspace_id } = request.params
        const workspace_selected = await workspace_repository.getById
            (workspace_id)

        if (!workspace_selected) {
            throw new ServerError(
                'Workspace no encontrado',
                404
            )
        } */
        return response.status(200).send({
            ok: true,
            message: "Workspace obtenido correctamente",
            status: 200,
            data: {
                workspace_selected: request.workspace
            }
        })
    }
)

/* 
Crear los endpoints
- (owner) DELETE /api/workspace/:workspace_id => Eliminar espacio de trabajo (hecho)
- (owner, admin) PUT  /api/workspace/workspace_id => Actualizar nombre/descripcion del espacio de trabajo (hecho)

tarea
- (todos) get /api/workspace/:workspace_id/members
- (owner, admin) DELETE  /api/workspace/:workspace_id/members/:member_id
- (owner, admin) POST /api/workspace/:workspace_id/members/invite
    body: email (el mail del usuario a invitar)
        revisar que el rol con el que se crea sea 'admin' o 'user'
        revisar que el ususario del email exista
        revisar que no este ya agregado al workspace
        crear la membresia con una propiedad 'invitacion_aceptada':false
        enviar un mail con un link para 'aceptar invitacion' (debe tener una expiracion y debe enviar un token)
            ese link hara un GET hacia /api/workspace/:workspace_id/members/accept-invite/:inivitation-token
 
- (todos) Unauthetified /api/workspace/:workspace_id/members/accept-invite/:inivitation_token
    Verifica que el invitation_token sea valido y edita la membresia para marcar que lo acepto
*/
workspace_router.delete(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner']),
    async (request, response) => {
        await workspace_repository.deleteById(request.workspace._id)
        await member_repository.deleteAllMembershipsByWorkspaceId(request.workspace._id)

        return response.status(200).send({
            ok: true,
            message: "Workspace eliminado correctamente",
            status: 200,
            data: {
                workspace_deleted: request.workspace
            }
        })
    }
)

workspace_router.put(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner', 'admin']),
    async (request, response) => {
        const { workspace_id } = request.params
        const { name, description } = request.body
        const workspace_updated = await workspace_repository.updateById(workspace_id, {
            nombre: name, descripcion: description
        })
        return response.status(200).send({
            ok: true,
            message: "Workspace actualizado correctamente",
            status: 200,
            data: {
                workspace_updated
            }
        })
    }
)


workspace_router.use(
    '/:workspace_id/channels',

    channel_router
)



export default workspace_router