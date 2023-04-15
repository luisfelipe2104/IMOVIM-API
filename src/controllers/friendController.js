import express from 'express'
import db from '../services/friendService.js'

const routes = express.Router()

// case null -> there isn't any friendship
routes.post('/send-solicitation', async (req, res) => {
  const { user_id, friend_id } = req.body

  try{
    const friendShipExists = await db.checkFriendShipExists(user_id, friend_id)
    if (friendShipExists.length) {
      if (friendShipExists[0].pending) {
        return res.status(400).json({ msg: "Amizade pendente", data: friendShipExists[0].pending })
      }
      return res.status(400).json({ msg: "Amizade já existe", data: friendShipExists[0].pending })
    }
    await db.makeFriends(user_id, friend_id)
    return res.status(200).json({ msg: "Solicitação de amizade enviada!" })
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})

// case 1 -> there is a pending friendship
routes.post('/accept-solicitation', async (req, res) => {
  const { user_id, friend_id } = req.body

  try{
    await db.acceptSolicitation(user_id, friend_id)
    return res.status(200).json({ msg: "Solicitação aceita" })
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})

// case 0 -> friendship already exists
routes.post('/remove-friendship', async (req, res) => {
  const { user_id, friend_id } = req.body

  try{
    await db.removeFriendship(user_id, friend_id)
    return res.status(200).json({ msg: "Amizade desfeita" })
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})

routes.get('/get-solicitations/:id', async (req, res) => {
  const user_id = req.params.id

  try{
    const results = await db.getSolicitations(user_id)
    return res.status(200).json(results)
  } catch(err) {
    return res.status(400).json({ msg: err.message })
  }
})

export default routes