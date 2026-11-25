import member_repository from "../repositories/member.repository.js"
import workspace_repository from "../repositories/workspace.repository.js"
import ServerError from "../utils/error.util.js"

/* 
Valida que el espacio de trabajo exista
Validar que quien consulta sea parte de este espacio de  trabajo
    rebisar que sea miembro de este workspace (que tenga membresia)(hecho)
Validar el rol de quien consulta
*/

//Valid_roles es un array con los tipos de roles validos para la consulta, el middleware evaluara si la membresia del usuario cumple con este requisito, sino lo bloqueara
function workspaceMiddleware(valid_roles) {

    return async function (request, response, next) {
        const { workspace_id } = request.params
        const workspace_selected = await workspace_repository.getById(workspace_id)

        const membership = await member_repository.getMembershipByUserAndWorkspace(request.user.id, workspace_id)
        console.log('Middleware', membership, workspace_id, request.user)

        if (!workspace_selected) {
            throw new ServerError(
                'Workspace no encontrado',
                404
            )
        }

        if (!membership) {
            throw new ServerError(
                "No eres miembro de este espacio de trabajo",
                403
            )
        }

        if (valid_roles.length > 0 && !valid_roles.includes(membership.rol)) {
            throw new ServerError(
                'No tiene permisos suficientes para hacer esta operacion', 403
            )

        }

        request.workspace = workspace_selected
        next()
    }
}




export default workspaceMiddleware