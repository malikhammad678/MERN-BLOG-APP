import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MONGODB Connected!")
    } catch (error) {
        console.log(error)
    }
} 