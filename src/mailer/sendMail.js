import nodemailer from "nodemailer";
import { config } from "dotenv";

config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD_APP
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  export const sendMailText = async (to, subject, html) => {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
      })
  } 
