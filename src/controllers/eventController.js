import express from "express";
import db from "../services/eventService.js";
import relativeTime from '../helpers/relativeTime.js';

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
    try {
        const events = await db.getEvents()

        events.map((event) => {
            event.event_date = relativeTime(event.event_date)
        })

        res.status(200).json(events)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-user-events/:id', async (req, res) => {
    const user_id = req.params.id

    try {
        const userEvents = await db.getUserEvents(user_id)

        userEvents.map((event) => {
            event.event_date = relativeTime(event.event_date)
        })

        res.status(200).json(userEvents)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

routes.post('/go-to-event', async (req, res) => {
    const { user_id, event_id } = req.body

    try {
        await db.goToEvent(event_id, user_id)
        return res.status(200).json({ msg: "Presença confirmada!" })
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

export default routes