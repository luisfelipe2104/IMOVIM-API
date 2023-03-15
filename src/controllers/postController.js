import express from 'express';
import db from '../services/postService.js';
import dayjs from 'dayjs-with-plugins';
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.extend(relativeTime)

// console.log(relativeTime)
dayjs.locale('pt-br')

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

routes.get('/get-post/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await db.getPost(id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ error: err})
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
routes.get('/get-num-likes/:id', async (req, res) => {
    const post_id = req.params.id
    try{
        const numLikes = await db.getNumOfLikes(post_id)
        return res.status(200).json(numLikes[0])
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-posts-of-friends/:id  (id = user_id)
routes.get('/get-posts-of-friends/:id', async (req, res) => {
    const user_id = req.params.id
    try{
        const posts = await db.getPostsOfFollowing(user_id)
        if(!posts.length) return res.status(200).json({ msg: "Não há posts de amigos" })
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-all-posts
routes.get('/get-all-posts', async (req, res) => {
    try{
        let posts = await db.getAllPosts()
        
        posts.map((post) => {
            // console.log(post);
            post.created_at = dayjs(post.created_at).fromNow();
            console.log(post);
        })

        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/get-posts-of-user/:id
routes.get('/get-posts-of-user/:id', async (req, res) => {
    const user_id = req.params.id
    try {
        const posts = await db.getPostsOfUser(user_id)
        return res.status(200).json(posts)
    } catch(err) {
        return res.status(500).json({ msg: err.message})
    }
})

// post/update-post
routes.post('/update-post', async (req, res) => {
    const { post_id, user_id, caption, image } = req.body
    try {
        await db.updatePost(post_id, user_id, caption, image)
        return res.status(200).json({ msg: 'Post atualizado!' })
    } catch(err) {
        return res.status(500).json({ err: err.message, msg: 'Erro ao atualizar o post' })
    }
})

// post;/delete-post?id=2&user=3
routes.delete('/delete-post', async (req, res) => {
    const { id, user } = req.query
    try {
        await db.deletePost(id, user)
        return res.status(200).json({ msg: 'Post deletado!' })
    } catch(err) {
        return res.status(500).json({ msg: 'Erro ao deletear o post', err: err.message })
    }
})

export default routes