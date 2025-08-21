import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'

const Blog = () => {

  const { _id } = useParams()

  const [blog,setBlog] = useState(null)

  const fetchBlog = () => {
    const filterBlog = blog_data.find(blog => blog._id === _id)
    setBlog(filterBlog)
  }

  useEffect(() => {
    fetchBlog()
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

       </div>

    </div>
  ) : (
    <>
    <p>Loading...</p>
    </>
  )
}

export default Blog
