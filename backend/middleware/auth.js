import jwt from 'jsonwebtoken'

export const protectedRoute = async (req,res,next) => {
    try {
        const token = req.headers.authorization;

        jwt.verify(token, process.env.SECRET_KEY)
        next()
        
    } catch (error) {
        console.log(error)
    }
}