import express from "express"
import userRoutes from "./controllers/userController.js"
import postRoutes from "./controllers/postController.js"
import commentRoutes from "./controllers/commentController.js"
import profileRoutes from "./controllers/profileController.js"
import authRoutes from "./controllers/authController.js"
import sportsRoutes from "./controllers/sportsController.js"
import eventRoutes from "./controllers/eventController.js"
import chatRoutes from "./controllers/chatController.js"
import friendShipRoutes from "./controllers/friendController.js"
import emailRoutes from "./mailer/send.js"

const routes = express()

routes.use("/mail", emailRoutes)
routes.use("/auth", authRoutes)
routes.use("/user", userRoutes)
routes.use("/post", postRoutes)
routes.use("/comment", commentRoutes)
routes.use("/profile", profileRoutes)
routes.use("/sports", sportsRoutes)
routes.use("/event", eventRoutes)
routes.use("/chat", chatRoutes)
routes.use("/friendShip", friendShipRoutes)

export default routes