import mysql from 'mysql2/promise' //Nos traemos el promise para trabajar con async await
import ENVIROMENT from './enviroment.config.js'

export const pool = mysql.createPool(
    {
        host: ENVIROMENT.MYSQL_DB_HOST,
        user: ENVIROMENT.MYSQL_DB_USER,
        password: ENVIROMENT.MYSQL_DB_PASSWORD,
        database: ENVIROMENT.MYSQL_DB_NAME,
        port: ENVIROMENT.MYSQL_DB_PORT,
        connectionLimit: 3, /*Cuantas conexiones como maximo podemos establecer */
        waitForConnections: true, /*Si llegamos al limite de conexiones, esperar a que alguna se libere (en vez de tirar error) */
        queueLimit: 0 /*Infinitas consultas pueden esperar en la cola de espera */
    }
)

export async function testConnection() {
    try {
        await pool.query('SELECT 1')

        console.log('MYSQL CONECTADO CORRECTAMENTE')
        return
    }
    catch (error) {
        console.error('ERROR en la conexion con MYSQL', error)
        return
    }

}

/** 
Esto es una conexion a la DB in dividual, todas las consultas a tu DB desde esta API se ejecutan desde esta conexion

const connection = mysql.createConnection(
    {
        host: ENVIROMENT.MYSQL_DB_HOST,
        user: ENVIROMENT.MYSQL_DB_USER,
        password: ENVIROMENT.MYSQL_DB_PASSWORD,
        database: ENVIROMENT.MYSQL_DB_NAME,
        port: ENVIROMENT.MYSQL_DB_PORT
    }
)
    connection.connect(
    // que hacer cuando se intente conectar
    //callbak
    (error) => {
        //Si hay error
        if (error) {
            console.error('Error de conexion: ', error)
            return
        }
        console.log("Conexion a MySQL exitosa")
    }
        ) export default connection
*/

