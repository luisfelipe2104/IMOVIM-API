import mongoose from "mongoose";

export default async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB, connectionParams)
        console.log("Connected to mongo")
    } catch (err) {
        console.error(err)
        console.log("Couldn't Connect to mongo")
    }
}