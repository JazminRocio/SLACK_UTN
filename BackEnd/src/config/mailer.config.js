import nodemailer from "nodemailer";
import ENVIROMENT from "./enviroment.config.js";

const mailer_transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: ENVIROMENT.GMAIL_USER,
            pass: ENVIROMENT.GMAIL_PASSWORD
        }
    }
)

export default mailer_transporter