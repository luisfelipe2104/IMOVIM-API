import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,            // <--- MUDANÇA: Porta mais compatível com Vercel
    secure: false,        // <--- MUDANÇA: false é obrigatório para porta 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD_APP
    },
    tls: {
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
        console.error("❌ Erro ao enviar email (Log Vercel):", error);
        return false;
    }
}
