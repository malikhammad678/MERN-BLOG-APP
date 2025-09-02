import toast from "react-hot-toast"
import { assets } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext"


const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const {  axios } = useAppContext()

    const { title, createdAt, _id } = blog
    const BlogData = new Date(createdAt)

    const togglePublish = async (id) => {
       try {
        const { data } = await axios.post("/api/blog/toggle",{ id })
        if(data.success){
          toast.success(data.message)
          fetchBlogs()
        } else {
          toast.error(data.message)
        }
       } catch (error) {
      toast.error(error.response?.data?.message || 'Error occured1!')
       }
    }

    const deleteBlog = async (id) => {
      const current = window.confirm("Are you sure to delete this blog?")
      if(!current){
        return;
      }
      try {
        const { data } = await axios.post('/api/blog/delete', { id })
        if(data.success){
          toast.success(data.message)
          fetchBlogs()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
      toast.error(error.response?.data?.message || 'Error occured1!') 
      }
    }

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">
        {index}
      </th>
      <td className="px-2 py-4">{ title } </td>
      <td className="px-2 py-4 max-sm:hidden">{ BlogData.toDateString() } </td>
      <td className="px-2 py-4 max-sm:hidden"> <p className={`${blog.isPublished ? "text-green-600" : "text-orange-600"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p> </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button onClick={() => togglePublish(_id)} className="border px-2 py-0.5 mt-1 rounded cursor-pointer">{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
        <img onClick={() => deleteBlog(_id)} src={assets.cross_icon} className="w-8 hover:scale-110 transition-all cursor-pointer" alt="" />
      </td>
    </tr>
  )
}

export default BlogTableItem
