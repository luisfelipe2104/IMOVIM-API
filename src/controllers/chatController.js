import db from '../services/chatService.js'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { ChatModel } from '../../database/ChatSchema.js'

const routes = express.Router()

routes.post('/create-room', async (req, res) => {
    const { user_id, friend_id } = req.body
    let roomExists = false

    // verify if the chat already exists
    const userRooms = await db.findUsersRoom(user_id)
    const friendRooms = await db.findUsersRoom(friend_id)

    userRooms.forEach((uRoom) => {
        friendRooms.forEach((fRoom) => {
            if (uRoom.room_id === fRoom.room_id) {
                roomExists = true
            }
        })
    })

    if (roomExists) {
        return res.status(200).json({ msg: 'chat já existe!' })
    }

    // create the chat
    const room_id = uuidv4()
    try {
        await db.createRoom(room_id)
        await db.insertUserInRoom(room_id, user_id)
        await db.insertUserInRoom(room_id, friend_id)
        return res.status(200).json({ msg: 'chat criado!' })
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.post('/create-group', async (req, res) => {
    const { room_name, description, photo } = req.body
    if (!room_name || !description) return res.status(400).json({ msg: "Insira o nome e descrição!" })
    const room_id = uuidv4()

    try{
        await db.createGroupRoom(room_id, room_name, description, photo)
        return res.status(200).json({ msg: 'Grupo criado!' })
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-users-room/:id', async (req, res) => {
    const user_id = req.params.id
    try{
        const data = await db.getUsersRoom(user_id)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.post('/create-message', async (req, res) => {
    const { message, author_id, time, room } = req.body

    const chat = new ChatModel({
        message: message,
        author_id: author_id,
        time: time,
        room: room
    })

    try {
        chat.save()
        return res.status(200).json({ msg: 'mensagem salva'})
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-messages/:room', async (req, res) => {
    const room = req.params.room
    
    await ChatModel.find({room: room})
    .then((data, err) => {
        if (err) return res.status(400).json({ msg: err})

        return res.status(200).json(data)
    })
})

routes.delete('/delete-messages/:room_id', async (req, res) => {
    const room_id = req.params.room_id

    try {
        await ChatModel.deleteMany({ room: room_id })
        await db.deleteMessages(room_id)
        return res.status(200).json({ msg: 'Mensagens deletadas!' })
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

export default routes