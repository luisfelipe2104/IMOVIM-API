import express from "express";
import db from "../services/eventService.js";

const routes = express.Router()

routes.post('/create-event', async (req, res) => {
    const { user_id, event_name, event_date, event_hour, localization, description, photo } = req.body;
    if (!user_id || !event_name || !event_date || !event_hour || !localization || !description) {
        return res.status(400).json({ msg: "Insira todas as informações do evento!" })
    }
    try {
        await db.createEvent(user_id, event_name, event_date, event_hour, localization, description, photo)
        return res.status(200).json({ msg: "Evento criado!" })
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-all-events', async (req, res) => {
    try{
        const events = await db.getEvents()
        res.status(200).json(events)
    } catch (err) {
        res.status(400).json({ msg: err.message})
    }
})

export default routes