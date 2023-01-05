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

// post/like-post
routes.post('/like-post', async (req, res) => {
    const { post_id, nickname } = req.body
    const userLikedPost = await db.checkUserLikedPost(nickname, post_id)
    if (userLikedPost.length) {
        await db.unlikePost(nickname, post_id)
        return res.status(200).json({ msg: "Usuario retirou a curtida do post"})
    }
    try{
        await db.likePost(nickname, post_id)
        return res.status(200).json({ msg: "Usuario curtiu o post"})
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-num-likes/:id
routes.post('/get-num-likes/:id', async (req, res) => {
    const post_id = req.params.id
    try{
        const numLikes = await db.getNumOfLikes(post_id)
        return res.status(200).json(numLikes)
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})


export default routes