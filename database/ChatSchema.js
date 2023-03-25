import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

export const ChatModel = mongoose.model('Chat', ChatSchema)