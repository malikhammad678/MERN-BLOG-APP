import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 45000,          
            bufferMaxEntries: 0,             
            connectTimeoutMS: 30000,         
        })
        console.log("MONGODB Connected!")
    } catch (error) {
        console.log(error)
    }
} 