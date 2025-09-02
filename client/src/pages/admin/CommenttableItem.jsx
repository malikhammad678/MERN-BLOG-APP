  import toast from "react-hot-toast";
  import { assets } from "../../assets/assets";
  import { useAppContext } from "../../context/AppContext";

  const CommenttableItem = ({ comment, fetchComments }) => {

      const { axios }  = useAppContext()

      const { blog,createdAt, _id } = comment; 
      const BlogDate = new Date(createdAt)

      const toggleAvailable = async () => {
        try {
          const { data } = await axios.post('/api/admin/approve-comment', { id:_id })
          if(data.success){
            toast.success(data.message)
            fetchComments()
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Error occured!')
        }
      }

      const deleteComment = async () => {
        try {
          const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
          if(data.success){
            toast.success(data.message)
            fetchComments()
          }  else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Error occured!')
        }
      }

    return (
      <tr className="order-y border-gray-300">
          <td className="px-6 py-4">
            <b className="font-medium text-gray-600">Blog</b> : {blog.title}
            <br />
            <br />
            <b className="font-medium text-gray-600">Name</b> : {comment.name}
            <br />
            <b className="font-medium text-gray-600">Comment</b> : {comment.content}
          </td>
          <td className="px-6 py-4 max-sm:hidden">
              {BlogDate.toLocaleDateString()}
          </td>
          <td className="px-6 py-4">
                <div className="inline-flex items-center gap-4">
              { !comment.isApproved ? 
                  <img onClick={toggleAvailable} src={assets.tick_icon} className="w-5 hover:scale-110 transition-all cursor-pointer" alt="" /> 
                  : <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>   
              } 
              <img onClick={deleteComment} src={assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer" />
                </div>
          </td>
      </tr>
    )
  }

  export default CommenttableItem
