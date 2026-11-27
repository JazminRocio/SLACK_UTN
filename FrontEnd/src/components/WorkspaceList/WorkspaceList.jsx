import React from 'react'
import useRequest from '../../hooks/useRequest.jsx'
import getAllWorkspaces from '../../services/workspaceService.js'
import { useEffect } from 'react'
import useWorkspaceList from '../../hooks/useWorkspaceList.jsx'

export default function WorkspaceList() {
    /*
   Llamar por HTTP (con fetch) a GET /api/workspace y renderizar la lista de espacio de trabajo en este componente, si no hay espacios de trabajo mostrar un mensaje tipo "Aun no creaste ningun espacio de trabajo"

   Mostrar "cargando..." mientras la request aun se este haciendo
   En caso de haber algun fallo mostrar "Error: {error}"

   PROTIP: usar el useRequest para manejar los estados de respuesta de la API
   -cargar la funcion getAllWorkspaces solo 1 vez (para evitar re-redering infinito)
    */

    const {
        workspaces_error,
        workspaces_loading,
        workspaces_response,
        reloadWorkspaces
    } = useWorkspaceList()

    if (workspaces_loading) {
        return <span>cargando...</span>
    }

    else if (workspaces_error) {
        return <div>
            <span className='error-text' >Error: {workspaces_error} </span>
            <button onClick={reloadWorkspaces}>Recargar</button>
        </div>
    }

    else if (!workspaces_response) {
        return <div>
            <span className='error-text' >Error: ocurrio un problema al obtener la lista de espacios de trabajo </span>
            <button onClick={reloadWorkspaces} >Recargar</button>
        </div>
    }

    else if (workspaces_response.data.workspaces.length === 0) {
        return <p>Aún no creaste ningún espacio de trabajo</p>
    }

    else {
        return <div>
            {workspaces_response.data.workspaces.map((workspace) => (
                <Link key={workspace.id} to={`/workspace/${workspace._id}`}> {workspace.nombre} </Link>
            ))}
        </div>
    }
}
