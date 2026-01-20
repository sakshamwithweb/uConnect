import mongoose from "mongoose"

export const connectDB = async () => {
    const mongoDbURI = process.env.MONGODB_URI
    if (!mongoDbURI) throw new Error("Unable to connect to mongoDB")
    await mongoose.connect(mongoDbURI)
    return mongoose
}