/* Un repository es donde manejamos la comunicacion con nuestros datos (Generalmente la DB) */


import { pool } from "../config/mysql.config.js"
import UserDTO from "../dto/user.dto.js"
import User from "../models/user.model.js"

class UserRepository {
    async crearUsuario(username, email, password) {
        User.create({ username: username, email: email, password: password })
    }

    //Version SQL
    /* async crearUsuario(nombre, email, password) {
        let query_sql = `INSERT INTO usuarios (nombre,email,password) VALUES(?,?,?)` */
    /* pool.execute sanitiza los valores a inyectar en la query 
    - devuelve un array con [resultado,  tablas]
     */
    /* const [result] = await pool.execute(
        query_sql,
        [
            nombre,
            email,
            password
        ]

    )
    console.log('[UserRepository.create]: ', result)
}
*/


    //Version MongoDB
    async getUsers() {
        const result = await User.find()
        console.log(result)
        return result

    }
    async getUsers() {
        const [result] = await pool.execute('SELECT * FROM usuarios')
        console.log('[UserRepository.get]: ', result)
        const result_formatted = result.map(
            (user) => {
                return new UserDTO(
                    user.id,
                    user.nombre,
                    user.email,
                    user.password,
                    user.activo,
                    user.fecha_creacion
                )
            }
        )
        return result_formatted

    }
    async getUsersByCreationDate(min_date, max_date) {
        const result = await User.find(
            {
                fecha_creacion: {
                    $gte: new Date(min_date),  //Establece una fecha minima
                    $lte: new Date(max_date)   //Establece una fecha maxima
                }
            }
        )
        console.log(result)
        return result

    }

    //getUsersByCreationDate('2026-9-10', '2026-10-30')

    /*Reglas para que tu servidor no se sature:
        -siempre que podamos, usar filtros del lado de la DB (son muchos mas oprtimos que usar for of)
     */

    async getUsersByName(name) {
        const result = await User.find({ nombre: name, activo: true })

        return result
    }

    //getUsersByName('Jazmin')


    async getUsersBySearchTherm(term) {
        const result = await User.find(
            {
                nombre: {
                    $regex: term,
                    $options: 'i' //para que no sea key sensitive (sin diferencia entre mayusculas y minusculas)
                }
            }
        )
        return result
    }

    //getUsersBySearchTherm('j')

    //MongoDB  
    async getUserById(user_id) {
        const result = await User.findById(user_id)

        return result
    }


    //Version SQL
    /* async getUserById(user_id) {
        const [result] = await pool.execute(
            'SELECT * FROM usuarios WHERE id = ?',
            [user_id]
        )
        const user_found = result[0]
        console.log('[UserRepository.get]: ', user_found)

        if (user_found) {
            return new UserDTO(
                user_found.id,
                user_found.nombre,
                user_found.email,
                user_found.activo,
                user_found.fecha_creacion
            )
        }
        else {
            return null
        }
    } */


    async getUserByEmail(email) {

        //Te devuelve null (si no encuentra) o un objeto con el resultado
        const result = await User.findOne({ email: email })
        return result
    }

    //getUserByEmail('pepe@mail.com')

    async deleteUserById(user_id) {
        const result = await User.findByIdAndDelete(user_id)
        return result
    }

    //deleteUserById('6ab282a0d20d0ff7a83bfb50')

    async softDeleteUserById(user_id) {
        const result = await User.findByIdAndUpdate(user_id, { activo: false })
        return result
    }

    //softDeleteUserById('6aabff9a190ff6061955c889')

    async updateById(user_id, update_data) {
        return await User.findByIdAndUpdate(
            user_id,
            update_data
        )
    }
}

const user_repository = new UserRepository()

export default user_repository