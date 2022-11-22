import express from "express"
import userRoutes from "./controllers/userController.js"

const routes = express()
routes.use("/user", userRoutes)

export default routes