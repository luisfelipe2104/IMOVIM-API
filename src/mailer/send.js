import express from 'express'
import { sendMailText } from './sendMail.js'
import { htmlMessage } from '../helpers/htmlMessage.js'

const routes = express.Router()

routes.post('/send-email', async (req, res) => {
    const { to, subject } = req.body

    if (!to || !subject) return res.status(400).json({ msg: "Insira todos os dados!" });

    try{
        const code = Math.floor(100000 + Math.random() * 900000)
        await sendMailText(to, subject, htmlMessage(code))
        return res.status(200).json({ msg: 'Email enviado!', code, user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD_APP })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })
    }
})

export default routes