import express from 'express'
import bcrypt from 'bcrypt'
import db from '../services/userService.js'

const routes = express.Router()

// user/create-user
routes.post("/create-user", async (req, res) => {
    const {nickname, email, password, birthday} = req.body
    
    // checks if the user already exists
    const checkUser = await db.checkExistingUser(nickname, email)
    let invalid = false
    if (checkUser.length) {
        checkUser.forEach((user) => {
            if (user.email === email && user.nickname === nickname) {
                invalid = true
                return res.status(409).json({msg: "Usuario já existe"})
            }
            else if (user.email === email) {
                invalid = true
                return res.status(409).json({msg: "Email já está sendo utilizado"})
            }
            else if (user.nickname === nickname) {
                invalid = true
                return res.status(409).json({msg: "Nickname já está sendo utilizado"})
            }
        })
    }

    if (!invalid) {
        // crypts the password
        const salt = bcrypt.genSaltSync(5)
        const hash = bcrypt.hashSync(password, salt)

        try{
            // creates the user
            await db.createUser(nickname, email, hash, birthday)
        
            return res.status(201).json({
                msg: 'Usuario cadastrado com sucesso'
            })
        }
        catch(err){
            res.status(500).json({
                msg: err
            })
        }
    }
})

// user/login
routes.post("/login", async (req, res) => {
    const {email, password} = req.body

    // search for the user in the database
    const user = await db.login(email)

    // case the user is not found in the database
    if (!user.length) return res.status(404).json({msg: 'Usuario não encontrado'})
    
    // checks the password
    const userPassword = user[0].password
    const isPasswordCorrect = bcrypt.compareSync(password, userPassword)
    if (!isPasswordCorrect) return res.status(400).json({msg : "Senha ou email incorretos"})

    return res.status(200).json({
        msg: 'Usuario logado com sucesso'
    })
})

export default routes