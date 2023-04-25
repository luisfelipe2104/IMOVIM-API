import express from 'express'
import { sendMailText } from './sendMail.js'

const routes = express.Router()

routes.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body

    if (!to || !subject || !text) return res.status(400).json({ msg: "Insira todos os dados!" });

    try{
        await sendMailText(to, subject, text)
        return res.status(200).json({ msg: 'Email enviado!' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })
    }
})

export default routes