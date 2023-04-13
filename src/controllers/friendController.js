import express from 'express'
import db from '../services/friendService.js'

const routes = express.Router()

routes.post('/send-solicitation', async (req, res) => {
  const { user_id, friend_id } = req.body

  try{
    const friendShipExists = await db.checkFriendShipExists(user_id, friend_id)
    if (friendShipExists.length) return res.status(400).json({ msg: "Amizade pendente ou já existe" })
    await db.makeFriends(user_id, friend_id)
    return res.status(200).json({ msg: "Solicitação de amizade enviada!" })
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})

routes.post('/accept-solicitation', async (req, res) => {
  const { user_id, friend_id } = req.body

  try{
    await db.acceptSolicitation(user_id, friend_id)
    return res.status(200).json({ msg: "Solicitação aceita" })
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})


export default routes