import express from 'express'
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getCommentData, togglePublish } from '../controller/blog.controller.js';
import upload from '../config/multer.js';
import { protectedRoute } from '../middleware/auth.js';

const blogRoute = express.Router()

blogRoute.post("/add", upload.single('image'), protectedRoute  ,addBlog)
blogRoute.get("/", getAllBlogs)
blogRoute.get("/:id", getBlogById)
blogRoute.post("/delete", protectedRoute, deleteBlogById)
blogRoute.post("/toggle", protectedRoute, togglePublish)
blogRoute.post("/add-comment", addComment)
blogRoute.get("/comments", getCommentData)

export default blogRoute;