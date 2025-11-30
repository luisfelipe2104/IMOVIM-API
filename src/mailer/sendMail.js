import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD_APP
    },
    tls: {
        // Necessário para evitar erros de certificado em alguns ambientes de desenvolvimento
        rejectUnauthorized: false 
    }
});

export const sendMailText = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Imovim System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("✅ Email enviado. ID:", info.messageId);
        return true;

    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        return false;
    }
}
