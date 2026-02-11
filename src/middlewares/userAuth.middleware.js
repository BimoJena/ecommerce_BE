import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(400).json({
            status: false,
            message: "Not Authorized Login Again."
        })
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(decodedToken.id){
            req.userId = decodedToken.id
        }
        else{
            return res.status(400).json({
                status: false,
                message: "Not Authorized Login Again."
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export default userAuth;