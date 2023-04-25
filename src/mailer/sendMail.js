import { createTransporter } from "./config.js";

export async function sendMailText(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    }

    await createTransporter().sendMail(mailOptions)
}