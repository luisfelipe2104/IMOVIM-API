import express from 'express';
import db from '../services/postService.js';

const routes = express.Router();

// post/create-post
routes.post('/create-post', async (req, res) => {
    const { user_id, caption, image } = req.body

    if (!caption && !image) return res.status(405).json({ msg: "Não é possível criar um post sem conteúdo"})
    
    try{
        await db.createPost(user_id, caption, image)
        return res.status(201).json({ msg: "Post criado com sucesso"})
    } 
    catch (err) {
        return res.status(500).json({ msg: "Erro ao criar o post"})
    }
})

// post/like-post
routes.post('/like-post', async (req, res) => {
    const { post_id, user_id } = req.body
    const userLikedPost = await db.checkUserLikedPost(user_id, post_id)
    if (userLikedPost.length) {
        await db.unlikePost(user_id, post_id)
        return res.status(200).json({ msg: "Usuario retirou a curtida do post"})
    }
    try{
        await db.likePost(user_id, post_id)
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
        return res.status(200).json(numLikes[0])
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-posts-of-friends/:id  (id = user_id)
routes.post('/get-posts-of-friends/:id', async (req, res) => {
    const user_id = req.params.id
    try{
        const posts = await db.getPostsOfFollowing(user_id)
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-all-posts
routes.post('/get-all-posts', async (req, res) => {
    try{
        const posts = await db.getAllPosts()
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

export default routes