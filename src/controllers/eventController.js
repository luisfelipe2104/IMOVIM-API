import express from "express";
import db from "../services/eventService.js";
import relativeTime from '../helpers/relativeTime.js';
import axios from "axios";

const routes = express.Router()

routes.post('/create-event', async (req, res) => {
    const { user_id, event_name, event_date, event_hour, description, photo, marker } = req.body;
    if (!user_id || !event_name || !event_date || !event_hour || !description || !photo || !marker) {
        return res.status(400).json({ msg: "Insira todas as informações do evento!" })
    }
    console.log(marker);
    console.log(marker[0].latitude)
    console.log(marker[0].longitude)
    try {
        const latitude = marker[0].latitude
        const longitude = marker[0].longitude
        await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=postcode&format=json&apiKey=3d3ba9cc1cd74c178a11d57e2009b645`)
        .then(async (result) => {
            // console.log(res.data.results[0]);
            const data = result.data.results[0]
            const cep = data.postcode
            await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(async (response) => {
                console.log(response.data);
                const street = response.data.logradouro
                const neighborhood = response.data.bairro
                const city = response.data.localidade
                const state = response.data.uf
                const address = `${street}, ${neighborhood}, ${city} - ${state}, ${cep}`
                console.log(address);
                await db.createEvent(user_id, event_name, event_date, event_hour, description, photo, address, latitude, longitude)
                return res.status(200).json({ msg: "Evento criado!" })
            })
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-event/:user_id/:event_id', async (req, res) => {
    const user_id = req.params.user_id
    const event_id = req.params.event_id

    try {
        const events = await db.getEvent(user_id, event_id)

        events.map((event) => {
            event.event_date = relativeTime(event.event_date)
        })

        res.status(200).json(events)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-all-events/:id', async (req, res) => {
    const user_id = req.params.id

    try {
        const events = await db.getEvents(user_id)

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

routes.get('/get-saved-events/:id', async (req, res) => {
    const user_id = req.params.id

    try {
        const savedEvents = await db.getSavedEvents(user_id)

        savedEvents.map((event) => {
            event.event_date = relativeTime(event.event_date)
        })

        res.status(200).json(savedEvents)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

routes.post('/go-to-event', async (req, res) => {
    const { user_id, event_id } = req.body

    try {
        const checkUserInEvent = await db.checkUserGoesToEvent(event_id, user_id)
        if (checkUserInEvent[0].userGoes) {
            await db.removeUserFromEvent(event_id, user_id)
            return res.status(200).json({ msg: 'Presença do evento retirada!'})
        }
        await db.goToEvent(event_id, user_id)
        return res.status(200).json({ msg: "Presença confirmada!" })
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

routes.post('/save-event', async (req, res) => {
    const { user_id, event_id } = req.body

    try {
        const checkSavedEvent = await db.checkUserSavedEvent(event_id, user_id)
        if (checkSavedEvent[0].userSaved) {
            await db.unsaveEvent(event_id, user_id)
            return res.status(200).json({ msg: 'Evento retirado de salvos!'})
        }
        await db.saveEvent(event_id, user_id)
        return res.status(200).json({ msg: "Evento salvo!" })
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

export default routes