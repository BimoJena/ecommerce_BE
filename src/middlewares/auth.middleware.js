import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.model.js';


export const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({
                status: false,
                message: "Unauthorized, token missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                status: false,
                message: "User not found"
            })
        }
        req.user = user;
        next();
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Invalid or Expired Token"
        })
    }
}