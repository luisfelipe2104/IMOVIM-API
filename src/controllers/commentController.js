import db from '../services/commentService.js'
import express from 'express'
import relativeTime from '../helpers/relativeTime.js'

const routes = express.Router()

// comment/create-comment
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

// comment/get-comments-of-post/:id
routes.get('/get-comments-of-post/:id', async (req, res) => {
    const post_id = req.params.id
    try {
        const comments = await db.getCommentsOfPost(post_id)

        comments.map((comment) => {
            comment.created_at = relativeTime(comment.created_at)
        })

        return res.status(200).json( comments )
    } catch(err) {
        return res.status(400).json({ msg: err.message })
    }
})

// comment/delete-comment?id=0&user=2
routes.delete('/delete-comment', async (req, res) => {
    const { id, user } = req.query
    try {
        await db.deleteComment(id, user)
        return res.status(200).json({ msg: "Comentario deletado!"})
    } catch(err) {
        return res.status(400).json({ msg: 'erro ao criar o comentário', err: err.message })
    }
})

// comment/update-comment
routes.post('/update-comment', async (req, res) => {
    const { comment, user_id, comment_id } = req.body
    if (!comment) return res.status(404).json({ msg: "Impossivel criar comentário vazio" })
    try {
        await db.updateComment(comment, comment_id, user_id)
        return res.status(200).json({ msg: "Comentario atualizado!"})
    } catch(err) {
        return res.status(400).json({ msg: 'erro ao atualizar o comentario!', err: err.message })
    }
})

export default routes