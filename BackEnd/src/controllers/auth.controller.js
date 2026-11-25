import ENVIROMENT from "../config/enviroment.config.js"
import mailer_transporter from "../config/mailer.config.js"
import user_repository from "../repositories/user.repository.js"
import { compareHash, generateHash } from "../utils/bcrypt.util.js"
import ServerError from "../utils/error.util.js"
import jwt from 'jsonwebtoken'



export async function register(request, response) {
    //console.log(reeee) //Error inesperable
    // console.log("[REGISTER]", request.body)

    const { username, email, password } = request.body
    if (!username || !email || !password) {
        throw new ServerError(
            "Email, password and username is required",
            400
        )
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {

        throw new ServerError(
            "Email is incorrect",
            400
        )

    }
    //Validar si email ya esta registrada
    const user_already_exist = await user_repository.getUserByEmail(email)
    if (user_already_exist) {
        throw new ServerError(
            'Email is already used',
            400
        )
    }
    /*Encriptamos la password para que en DB se guarde un dato irreversible
    viendo el dato irreversible es improbable que sepa el dato orginal */
    const password_hash = await generateHash(password)

    await user_repository.crearUsuario(username, email, password_hash)

    const verify_email_token = jwt.sign(
        {
            email: email
        },
        ENVIROMENT.JWT_SECRET_KEY,
        {
            expiresIn: '7d' //expira en 7 dias
        }
    )

    //Validacion de mail
    await mailer_transporter.sendMail(
        {
            to: email,
            from: ENVIROMENT.GMAIL_USER,
            subject: 'Verifica tu cuenta',
            html: `
            <body>
                <h1> Bienvenido a nuestra plataforma. </h1>
                <p> Necesitamos verificar este correo electronico.</p>
                <a href='${ENVIROMENT.URL_BACKEND}/api/auth/verify-email/${verify_email_token}'> Click aqui para verificar tu identidad </a>
            </body>`
        }
    )

    return response.status(201).send(
        {
            ok: true,
            status: 201,
            message: "User registered succesfully"
        }
    )
}

export async function login(request, response) {
    const { email, password } = request.body;
    if (
        !email || !password || typeof email !== "string" || typeof password !== "string"
    ) {
        throw new ServerError(
            "Email and password are required",
            400
        );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ServerError(
            "Email is incorrect",
            400
        );
    }

    const user = await user_repository.getUserByEmail(email)
    if (!user) {
        throw new ServerError(
            "Invalid email or password", // Mensaje genérico por seguridad
            401
        );
    }

    // Compara el hash guardado en DB contra la contraseña que nos envió por body el cliente
    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) {
        throw new ServerError(
            "Invalid email or password",
            401
        );
    }

    if (!user.email_verficado) {
        throw new ServerError(
            'Email no verificado', 403
        )
    }


    /* CREAR UN TOKEN FIRMADO DE SESION */
    const auth_token = jwt.sign(
        {
            //Aca va la informacion que queres guardar en la credencial
            id: user._id,
            name: user.nombre,
            email: user.email
        },
        ENVIROMENT.JWT_SECRET_KEY //Firmamos con esto
    )
    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: "You have logged in successfully",
            data: {
                auth_token
            }
        }
    )
}

export async function verifyEmail(request, response) {
    const { verify_email_token } = request.params
    //Verificar el token
    const { email } = jwt.verify(
        verify_email_token,
        ENVIROMENT.JWT_SECRET_KEY
    )

    const user_found = await user_repository.getUserByEmail(email)

    //Si no existe el usuario, error
    if (!user_found) {
        throw new ServerError('Usuario no encontrado', 404)
    }

    if (!user_found.activo) {
        throw new ServerError('Usuario desactivado de la plataforma, contactate con soporte si consideras que este es un error', 403)
    }

    //Si ya estas verificado deja de intentar de verificar
    if (user_found.email_verficado) {
        throw new ServerError('Ya estas verificado', 400)
    }

    //Actualizamos el usuario para verificarlo
    await user_repository.updateById(
        user_found._id,
        {
            email_verficado: true
        }
    )

    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: 'usuario verificado exitosamente'
        }
    )

}