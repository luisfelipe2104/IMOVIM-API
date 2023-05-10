import express from "express";
import db from "../services/blockService.js"

const routes = express.Router()

routes.post('/block-user', async (req, res) => {
    const { user_id, blocked_user_id } = req.body

    try {
        const isUserBlocked = await db.checkUserIsBlocked(user_id, blocked_user_id)
        if (isUserBlocked) {
            await db.unblockUser(user_id, blocked_user_id)
            return res.status(200).json({ 'msg': 'Usuário desbloqueado!' })
        } else {
            await db.blockUser(user_id, blocked_user_id)
            return res.status(200).json({ 'msg': 'Usuário bloqueado!' })
        }
    } catch (err) {
        return res.status(500).json({ 'msg': err.message })
    }
})

routes.get('/get-blocked-users/:id', async (req, res) => {
    const user_id = req.params.id

    try{
        const data = await db.getBlockedUsers(user_id)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

routes.delete('/unblock-user/:user_id/:blocked_user_id', async (req, res) => {
    const { user_id, blocked_user_id } = req.params

    try {
        await db.unblockUser(user_id, blocked_user_id)
        return res.status(200).json({ 'msg': 'Usuário desbloqueado!' })
    } catch (err) {
        return res.status(500).json({ 'msg': err.message })
    }
})

export default routes