import nodeMailer from 'nodemailer'
import { createTransport } from 'nodemailer'

export async function createTransporter() {
    return createTransport({
        host: "smtp.ethereal.email",
        port: 333,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD_APP
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    })
}