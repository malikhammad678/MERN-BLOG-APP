import jwt from 'jsonwebtoken'

export const login = async (req,res) => {
    try {
        const { email,password } = req.body;
        if(!email || !password){
          return res.json({ success:false, message:"Please fill in all fields!" })
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({ success:false, message:"Invalid Credentials!" })
        }
        const token = jwt.sign({ email }, process.env.SECRET_KEY)
        res.json({ success:true, token })
    } catch (error) {
         res.json({ success:false, message:error.message })
    }
}