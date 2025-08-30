import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoute from './route/user.route.js'
import blogRoute from './route/blog.route.js'

const app  =  express()
app.use(cors())
app.use(express.json())

app.use("/api/admin", userRoute)
app.use("/api/blog",blogRoute)

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    connectDB()
    console.log(`App is listen on ${PORT}`)
})