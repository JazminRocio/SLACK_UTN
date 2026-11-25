
import connectMongoDB from "./config/mongo.config.js";
import { testConnection } from "./config/mysql.config.js";
connectMongoDB()
//testConnection()
import express, { request, response } from 'express'

import errorHandlerMiddleware from "./middleware/error.middleware.js";
import auth_router from "./routes/auth.router.js";
import user_routher from "./routes/users.router.js";
import authMiddleware from "./middleware/auth.middleware.js";
import workspace_repository from "./repositories/workspace.repository.js";
import member_repository from "./repositories/member.repository.js";
import workspace_router from "./routes/workspace.router.js";
import mailer_transporter from "./config/mailer.config.js";
import ENVIROMENT from "./config/enviroment.config.js";
import user_repository from "./repositories/user.repository.js";
import cors from 'cors'

const PORT = 8080

const app = express()
/*Middleware
configuramos nuestra API para que el body pueda ser tipo de dato JSON
    -Cada vez que llegue una consulta el middleware revisara si el request.header['Content-Type'] es 
    'aplication/json y transformara el JSON recibido y lo guardara en el request.body*/
app.use(express.json())

// Deshabilita la cors policy  = cualquiera puede consultar
app.use(cors())

app.get(
    '/api/status',
    (request, response) => {
        return response.status(200).send('<h1>Request recibida </h1>')
    }
)


/* app.post(
    '/api/workspace',
    authMiddleware,
    async (request, response) => {
        //quien quiere hacer esta operacion?
        console.log('[CREATE WORKSPACE]', request.user)
        const { name, description } = request.body

        
        Validar que este en nombre del workspace
        Crear el espacio de trabajo
        Crear la membresia a nombre del usuario creador con rol de owner
        

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
 */
app.use('/api/users', user_routher)
app.use('/api/auth', auth_router)

app.use('/api/workspace', workspace_router)


app.use(
    errorHandlerMiddleware
)

app.listen(
    PORT,
    () => {
        console.log(`El servidor se esta escuchando correctamente en http:/localhost:${PORT}`)
    }
)

/* mailer_transporter.sendMail(
    {
        to: 'jazmin.quispe.dev@gmail.com',
        from: ENVIROMENT.GMAIL_USER,
        subject: 'mail prueba',
        html: `
        <body>
            <h1> Esto es un mail de prueba </h1>
        </body> `
    }

) */

//user_repository.crearUsuario('test-1', 'test-1@gmail.com', 'test123')

// Probando con codigo sql user_repository.getUsers()

//user_repository.getUserById(1)