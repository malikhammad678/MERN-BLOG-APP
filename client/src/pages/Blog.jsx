import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const { _id } = useParams()


  const { axios } = useAppContext()

  const [blog,setBlog] = useState(null)
  const [comments,setComments] = useState([])
  const [name,setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${_id}`)
      if(data.success){
        setBlog(data.blog)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Occured!")
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { id:_id })
      if(data.success){
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Occured!")
    }
  }

  const addComment =  async (e) => {
     try {
      e.preventDefault()
      const  { data } = await axios.post('/api/blog/add-comment', { blog: _id , name, content})
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.response?.data?.message || "Error Occured!")
     }
  }
  useEffect(() => {
    fetchBlog()
    fetchComments()
  },[_id])

  return blog ? (
    <div className='relative'>
       <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
       <Navbar />
         
       <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(blog.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{blog.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{blog.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michael Brown</p>
       </div>

       <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
           <img src={blog.image} alt="" className='rounded-3xl mb-5' />

         <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: blog.description }}>
         </div>

         <div className='mt-14 mb-10 max-w-3xl mx-auto'>
               <p>Comments ({comments.length})</p>
               <div className='flex flex-col gap-4'>
                 { comments.map((item,index) => (
                  <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                      <div className='flex items-center gap-2 mb-2'>
                        <img src={assets.user_icon} alt="" className='w-6' />
                        <p className='font-medium'>{item.name}</p>
                      </div>
                      <p className='text-sm max-w-md ml-8'>{item.content}</p>
                      <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{moment(item.createdAt).fromNow()}</div>
                  </div>
                 )) }
               </div>
         </div>

         <div className='max-w-3xl mx-auto'>
                  <p className='font-semibold mb-4'>Add your comment</p>
                  <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>
                    <textarea name="" onChange={(e) => setContent(e.target.value)} value={content} placeholder='Comment' required className='w-full p-2 border border-gray-300 rounded outline-none h-48' id=""></textarea>
                    <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
                  </form>
         </div>

        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share article on social media</p>
          <div className='flex'>
              <img src={assets.facebook_icon} width={50} alt="" />
              <img src={assets.twitter_icon} width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
       </div>
       <Footer />

    </div>
  ) : (
    <>
    <Loader />
    </>
  )
}

export default Blog
