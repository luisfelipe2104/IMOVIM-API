import express from 'express'
import { createUser } from '../services/userService.js'

const routes = express.Router()
routes.post("/create-user", async (req, res) => {
    const {nickname, email, password, birthday} = req.body
    console.log(nickname, email, password, birthday)
})

export default routes