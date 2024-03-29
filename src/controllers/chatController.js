import db from '../services/chatService.js'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { ChatModel } from '../../database/ChatSchema.js'
import { getGroupMembers } from '../services/chatService.js'

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
    const { room_name, description, photo, user_id } = req.body
    if (!room_name || !description || !user_id) return res.status(400).json({ msg: "Insira o nome e descrição!" })
    const room_id = uuidv4()

    try{
        await db.createGroupRoom(room_id, room_name, description, photo)
        await db.insertUserInRoom(room_id, user_id)
        return res.status(200).json({ msg: 'Grupo criado!', room_id })
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-group-members/:id', async (req, res) => {
    const room_id = req.params.id
    
    try {
        const data = await db.getGroupMembers(room_id)
        return res.status(200).json(data)
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.post('/insert-user-in-group', async (req, res) => {
    const { users, room_id } = req.body

    if (!users || !room_id) return res.status(400).json({ msg: "Insira todos dados!" })

    try {
        users.forEach(async (user) => {
            await db.insertUserInRoom(room_id, user.user_id)
        })
        return res.status(200).json({ msg: "Usuarios adicionados!" })
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

routes.delete(`/exit-room/:room_id/:user_id`, async (req, res) => {
    const { room_id, user_id } = req.params
    try {
        await db.exitRoom(room_id, user_id)
        return res.status(200).json({ msg: 'Você saiu do grupo!'})
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.delete('/remove-message/:id', async (req, res) => {
    const { id } = req.params

    try {
        await ChatModel.findByIdAndRemove(id).exec()
        return res.status(200).json({ msg: 'Mensagem deletada!'})
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-messages/:room', async (req, res) => {
    const room = req.params.room
    
    let finalData = []
    
    await ChatModel.find({room: room})
    .then(async (data, err) => {
        if (err) return res.status(400).json({ msg: err})

        const chatMembers = await getGroupMembers(room)

        await data.map((msg) => {
            chatMembers.map((member) => {
                if (member.user_id == msg.author_id) {
                    finalData.push({
                        _id: msg._id,
                        message: msg.message,
                        author_id: msg.author_id,
                        time: msg.time,
                        room: msg.room,
                        nickname: member.nickname,
                        profileImage: member.profileImage
                    })
                }
            })
        })

        return res.status(200).json(finalData)
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