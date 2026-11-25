import { login, register, verifyEmail } from "../controllers/auth.controller.js"
import express from 'express'

/*
Validacion del email del usuario
*/
const auth_router = express.Router()

auth_router.post('/register', register)

/*
Cuando un usario inicia sesion debemos crear de alguna forma la sesion */
auth_router.post('/login', login)


auth_router.get('/verify-email/:verify_email_token', verifyEmail)

export default auth_router