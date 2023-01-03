import express from "express"
import userRoutes from "./controllers/userController.js"
import postRoutes from "./controllers/postController.js"

const routes = express()
routes.use("/user", userRoutes)
routes.use("/post", postRoutes)

export default routes