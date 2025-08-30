import express from 'express'
import { login } from '../controller/user.controller.js';

const userRoute = express.Router()

userRoute.post("/login", login)

export default userRoute;