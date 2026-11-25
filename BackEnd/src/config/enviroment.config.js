import dotenv from 'dotenv'

/* npm install dotenv*/

/*CARGA EN process.env LAS VARIABLES DE ENTORNO DEFINIDAS EN EL ARCHIVO .ENV*/

dotenv.config()
const ENVIROMENT = {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    URL_BACKEND: process.env.URL_BACKEND,

    MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
    MYSQL_DB_USER: process.env.MYSQL_DB_USER,
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME
}

export default ENVIROMENT