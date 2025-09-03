import fs from 'fs'
import imageKit from '../config/imagekit.js';
import Blog from '../model/blog.model.js';
import Comment from '../model/comment.model.js';
import main from '../config/gemini.js'


export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields!" });
        }
        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname || `${Date.now()}.jpg`,
            folder: "/blogs"
        });

        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        const blog = await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublished
        });

        res.json({ success: true, message: 'Blog Added!' });

    } catch (error) {
        console.error("Upload error:", error);
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({ isPublished:true })
        res.json({ success:true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
  try {
    const { _id } = req.params;

    const blog = await Blog.findById(_id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found!" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteBlogById = async (req,res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id)

        await Comment.deleteMany({ blog:id })

        res.json({ success:true, message:" Blog Deleted! " })
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }
}

export const togglePublish = async (req,res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({ success:true, message:"Blog status updated" })
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }
}

export const addComment = async (req,res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content })
        res.json({ success:true, message:"Comment added for review!" })
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }
}

export const getCommentData = async (req,res) => {
   try {
       const  { id } = req.body;
       const comments = await Comment.find({
        blog:id,
        isApproved:true
       }).sort({ createdAt:-1 })
       res.json({ success:true, comments })
   } catch (error) {
        res.json({ success: false, message: error.message }); 
   }
}

export const generateContent = async (req,res) => {
    try {
        const { prompt } = req.body;
        const content = await main(`${prompt} Generate a blog content for this topic in simple text formate`)
        res.json({ success:true, content })
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }
}

