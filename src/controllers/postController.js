import express from 'express';
import db from '../services/postService.js';

const routes = express.Router();

// post/create-post
routes.post('/create-post', async (req, res) => {
    const { author, caption, image } = req.body

    if (!caption && !image) return res.status(405).json({ msg: "Não é possível criar um post sem conteúdo"})
    
    try{
        await db.createPost(author, caption, image)
        return res.status(201).json({ msg: "Post criado com sucesso"})
    } 
    catch (err) {
        return res.status(500).json({ msg: "Erro ao criar o post"})
    }
})

export default routes