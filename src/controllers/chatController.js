import db from '../services/chatService.js'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'

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

routes.get('/get-users-room/:id', async (req, res) => {
    const user_id = req.params.id
    try{
        const data = await db.getUsersRoom(user_id)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

export default routes