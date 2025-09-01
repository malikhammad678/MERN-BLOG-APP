import express from 'express'
import { approveComment, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashbaord, login } from '../controller/user.controller.js';
import { protectedRoute } from '../middleware/auth.js';

const userRoute = express.Router()

userRoute.post("/login", login)
userRoute.get("/comments", protectedRoute ,getAllComments)
userRoute.get("/blogs", protectedRoute, getAllBlogsAdmin)
userRoute.post("/delete-comment", protectedRoute, deleteCommentById)
userRoute.post("/approve-comment", protectedRoute, approveComment)
userRoute.get("/dashboard", protectedRoute, getDashbaord)

export default userRoute;