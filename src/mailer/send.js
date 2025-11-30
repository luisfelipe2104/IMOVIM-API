import express from 'express'
import { sendMailText } from './sendMail.js'
import { htmlMessage } from '../helpers/htmlMessage.js'

const routes = express.Router()

routes.post('/send-email', async (req, res) => {
    const { to, subject } = req.body;

    if (!to || !subject) return res.status(400).json({ msg: "Insira todos os dados!" });

    try {
        const code = Math.floor(100000 + Math.random() * 900000);

        const enviou = await sendMailText(to, subject, htmlMessage(code));

        if (enviou) {
            return res.status(200).json({ 
                msg: 'Email enviado com sucesso!', 
            });
        } else {
            return res.status(500).json({ msg: "Falha no serviço de envio de e-mail." });
        }

    } catch (err) {
        console.error("Erro na rota de email:", err);
        return res.status(500).json({ msg: "Erro interno do servidor." });
    }
});

export default routes
