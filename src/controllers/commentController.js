import db from '../services/commentService.js'
import express from 'express'

const routes = express.Router()

routes.post('/create-comment', async (req, res) => {
    const { comment, user_id, post_id } = req.body

    if(!comment) return res.status(400).json({ msg: "Impossível postar um comentário vazio" })

    try{
        await db.createComment(comment, user_id, post_id)
        return res.status(200).json({ msg: "Comentário criado"})
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

routes.get('/get-comments-of-post/:id', async (req, res) => {
    const post_id = req.params.id
    try {
        const comments = await db.getCommentsOfPost(post_id)
        return res.status(200).json( comments )
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }

})

export default routes