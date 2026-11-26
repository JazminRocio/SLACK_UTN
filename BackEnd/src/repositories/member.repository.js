/* Un repository es donde manejamos la comunicacion con nuestros datos (Generalmente la DB) */

import Member from "../models/member.model.js"
import Workspace from "../models/workspace.model.js"

class MemberRepository {
    async create(id_usuario, id_espacio_trabajo, rol) {
        return Member.create({
            id_usuario: id_usuario,
            id_espacio_trabajo: id_espacio_trabajo,
            rol: rol,
            activo: true
        })
    }

    async deleteById(member_id) {
        const result = await Member.findByIdAndDelete(member_id)
        console.log(result)
        return result
    }

    async updateRoleByID(member_id, new_role) {
        const result = await Member.findByIdAndUpdate(member_id, { rol: new_role }, { new: true })
        console.log(result)
        return result
    }


    /* clase 20
    FORMATO:
    {
        member_id,
        member_role,
        workspace_id,
        workspace_name,
        workspace_fecha_creacion
    }
    */
    async getAllWorkspaceByUserId(id_usuario) {
        //Traer todas las membresias de un usuario

        const result = await Member
            .find({ id_usuario: id_usuario })
            .select('role fecha_creacion id_espacio_trabajo')
            .populate(
                'id_espacio_trabajo', //populate permite expandir las referencias 
                'nombre fecha_creacion'
            )
        return result.map(
            membership => {
                return {
                    member_id: membership._id,
                    member_rol: membership.rol,
                    workspace_id: membership.id_espacio_trabajo._id,
                    workspace_nombre: membership.id_espacio_trabajo.nombre,
                    workspace_fecha_creacion: membership.id_espacio_trabajo.workspace_fecha_creacion
                }
            }
        )

    }

    async getAllMembersshipsByWorkspaceId(id_espacio_trabajo) {
        //Traer todas las membresias de un espacio de trabajo

        const result = await Member
            .find({ id_espacio_trabajo: id_espacio_trabajo })
            .populate('id_usuario',
                'nombre email'
            )
        console.log(result)
    }

    async getMembershipByUserAndWorkspace(user_id, workspace_id) {
        return await Member.findOne({ id_usuario: user_id, id_espacio_trabajo: workspace_id })
    }
    //Borrar la membresia asociada al espacio de trabajo
    async deleteAllMembershipsByWorkspaceId(workspace_id) {
        await Member.deleteMany({ id_espacio_trabajo: workspace_id })
    }
}

const member_repository = new MemberRepository()

export default member_repository