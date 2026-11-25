/*
NO TODOS LOS ERRORES SON IGUALES, EN BACKEND VAMOS A TENER 2 GRANDES TIPOS DE ERROR:
    -Incontrolables-->API RESPONDE 500 INTERNAL SERVER ERROR
    -Controlados--> son errores que estan contemplados, API lanzara el ServeError con mensaje y estatus
 */


/*
Un server error son errores contemplados del lado del servidor
Los vamos a  diferenciar de los errores comunes porque tienen status */
class ServerError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

export default ServerError


/*
trow sirve para lanzar errores en JS
*/