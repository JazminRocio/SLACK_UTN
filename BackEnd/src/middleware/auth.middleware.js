import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.config.js'
import ServerError from '../utils/error.util.js'

function authMiddleware(request, response, next) {

    try {

        const auth_header = request.headers.authorization //'Bearer token_value'
        if (!auth_header) {
            throw new ServerError('Auth header is requered ', 400)
        }

        //auth_header.split('') = ['Bearer', 'token_value']
        const auth_token = auth_header.split(' ')[1] //token_value
        if (!auth_token) {
            throw new ServerError('Auth header is malformed', 400)
        }

        //Verificamos la firma, para ver si coinciden (SI ESTO FALLA LANZA ERROR)
        //Si todo sale bien podemos leer el contenido que dejamos en ese token
        const { id, name, email } = jwt.verify(auth_token, ENVIROMENT.JWT_SECRET_KEY)
        //mutamos la request para que ahora guarde dentro de la nueva propiedad user
        request.user = {
            id: id,
            name: name,
            email: email
        }

        //que vaya al siguiente controlador
        next()
    }
    catch (error) {
        //Si hubo algun fallo al verificar el token
        if (error instanceof jwt.JsonWebTokenError //Falla verificacion o esta mal escrito
            ||
            error instanceof jwt.NotBeforeError //Es un token del futuro
            ||
            error instanceof jwt.TokenExpiredError //Es un token expirado
        ) {
            response.status(401).send(
                {
                    ok: false,
                    status: 401,
                    message: 'Auth token is invalid!'
                }
            )
        }
        if (error.status) {
            return response.status(error.status).send(
                {
                    ok: false,
                    status: error.status,
                    message: error.message
                }
            )
        }
        console.error('[Middleware de Error]:', error)
        //Error generico
        return response.status(500).send(
            {
                ok: false,
                status: 500,
                message: 'Internal server error'
            }
        )
    }
}


export default authMiddleware