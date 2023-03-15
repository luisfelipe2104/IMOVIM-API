import express from 'express'
import cors from 'cors'
import routes from './routes.js'
import { config } from 'dotenv'
import connect_MongoDB from './database/mongoDB.js'

config() // initializes the env variables

const app = express()
const PORT = process.env.PORT || 3333

// await connect_MongoDB()

app.use(express.json())
app.use(cors())
app.use("/", routes)

app.listen(PORT, () => {
    console.log(`api running on port: ${PORT}`)
})