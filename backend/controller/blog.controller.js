import fs from 'fs'
import ImageKit from '../config/imagekit.js';
import Blog from '../model/blog.model.js';

export const addBlog = async (req,res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile  = req.file;
        if(!title || !description || !category || !imageFile){
            return res.json({ success:false, message:"Missing required fields!" })
        }
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await ImageKit.upload({
            file:fileBuffer,
            fileName:fileBuffer.originalName,
            folder:"/blogs"
        })
        const optimizedImageUrl = ImageKit.url({
            path:response.filePath,
            transformation:[
                { quality:'auto' },
                { format:'webp' },
                { width:'1280' }
            ]
        })
        const image = optimizedImageUrl

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        })

        res.json({ success:true, message:'Blog Added!' })


    } catch (error) {
        
    }
}