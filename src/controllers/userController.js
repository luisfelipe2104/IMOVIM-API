import express from 'express'
import bcrypt from 'bcrypt'
import db from '../services/userService.js'

const routes = express.Router()

// user/create-user
routes.post("/create-user", async (req, res) => {
    const {nickname, email, password, birthday} = req.body
    console.log(nickname, email, password, birthday)
    
    // checks if the user already exists
    const checkUser = await db.checkExistingUser(nickname, email)
    if (checkUser.length) {
        checkUser.forEach((user) => {
            if (user.email === email && user.nickname === nickname) {
                res.status(409).json({msg: "Usuario já existe"})
            }
            else if (user.email === email) {
                res.status(409).json({msg: "Email já está sendo utilizado"})
            }
            else if (user.nickname === nickname) {
                res.status(409).json({msg: "Nickname já está sendo utilizado"})
            }
        })
    }

    // crypts the password
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)

    try{
        // creates the user
        await db.createUser(nickname, email, hash, birthday)
    
        res.status(201).json({
            msg: 'Usuario cadastrado com sucesso'
        })
    }
    catch(err){
        res.status(500).json({
            msg: err
        })
    }
})

export default routes