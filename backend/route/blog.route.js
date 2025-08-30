import express from 'express'
import { addBlog } from '../controller/blog.controller';
import upload from '../config/multer.js';
import { protectedRoute } from '../middleware/auth.js';

const blogRoute = express.Router()

blogRoute.post("/add", upload.single('image'), protectedRoute  ,addBlog)

export default blogRoute;