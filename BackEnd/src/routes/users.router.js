import express from 'express'
import { getUsers, getUsersById } from '../controllers/user.controller.js'

const user_routher = express.Router()

user_routher.get('/', getUsers)
user_routher.get('/:user_id', getUsersById)

export default user_routher