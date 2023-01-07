import express from "express"
import userRoutes from "./controllers/userController.js"
import postRoutes from "./controllers/postController.js"
import commentRoutes from "./controllers/commentController.js"
import profileRoutes from "./controllers/profileController.js"

const routes = express()

routes.use("/user", userRoutes)
routes.use("/post", postRoutes)
routes.use("/comment", commentRoutes)
routes.use("/profile", profileRoutes)

export default routes