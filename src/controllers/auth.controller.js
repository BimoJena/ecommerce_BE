import dotenv from 'dotenv';
dotenv.config();
import {userModel} from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {resend} from '../config/resend.js';

// register API
export const register = async (req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        })
    }
    try{
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(401).json({
                status: false,
                message: "User Already Exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name, email, password: hashPassword
        })
        await user.save();

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        const isProd = process.env.NODE_ENV === "production"
        res.cookie("token", token, {
            httpOnly: true,        
            secure: isProd,  // for developement(false)        
            sameSite: isProd ? "strict" : "lax", //for localhost testing   
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            status: true,
            message: "User Registered Successfully."
        })

    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// login API
export const login = async (req,res) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        })
    }
    try{
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(401).json({
                status: false,
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({
                status: false,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {id: userExist._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        const isProd = process.env.NODE_ENV === "production"
        res.cookie("token", token, {
            httpOnly: true,        
            secure: isProd,  // for developement(false)        
            sameSite: isProd ? "strict" : "lax", //for localhost testing   
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            status: true,
            message: "User LoggedIn Successfully",
            user: {
                Name: userExist.name,
                Email: userExist.email
            }
        });
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// logout API
export const logout = async (req,res) => {

    const isProd = process.env.NODE_ENV === "production"
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "strict" : "lax"
        })
        return res.status(200).json({
            status: true,
            message: "LoggedOut Successfully",
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// send verification OTP
export const sendVerifyOtp = async (req,res) => {
    try{
        const user = await userModel.findById(req.userId);
        if(!user){
            return res.status(400).json({
                status: false,
                message: "User not found"
            })
        }
        if(user.isAccountVerified){
            return res.status(400).json({
                status: false,
                message: "User Already Verified."
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 24*60*60*1000;
        await user.save();

        await resend.emails.send({
            from: "Ecommerce Development <onboarding@resend.dev>",
            to: user.email,
            subject: "Email Verification OTP",
            html: `<p>Your OTP is <b>${otp}</b></p>`
        }).catch((err) => {
            return res.status(400).json({
                status: false,
                message: "Resend API Down",
                error: err.message
            })
        })

        return res.status(200).json({
            status: true,
            message: "OTP Sent successfully"
        })

    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// get otp and verify account
export const verifyEmail = async (req,res) => {
    const {otp} = req.body;
    const userId = req.userId;
    if(!userId || !otp){
        return res.status(200).json({
            status: false,
            message: "Missing Details"
        })
    }

    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).json({status: false, message: "User not found"})
        }
        if(user.verifyOtp == "" || user.verifyOtp != otp){
            return res.status(400).json({status: false, message: "Invalid Otp"})
        }
        if(user.verifyOtpExpiresAt < Date.now()){
            return res.status(400).json({status: false, message: "OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpiresAt = 0;

        await user.save();
        return res.status(200).json({
            status: true,
            message: "Email Verified Successfully"
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

// send reset otp
export const sendResetOTP =  async (req,res) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            status: false,
            message: "Email Required."
        })
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({status: false, message: "User not found"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        await resend.emails.send({
            from: "Ecommerce Development <onboarding@resend.dev>",
            to: user.email,
            subject: "Reset Password OTP",
            html: `<p>Your OTP is <b>${otp}</b></p>`
        }).catch((err) => {
            return res.status(400).json({
                status: false,
                message: "Resend API Down",
                error: err.message
            })
        })

        return res.status(200).json({
            status: true,
            message: "OTP sent successfully"
        });
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// get otp and reset password
export const resetPassword = async (req,res) => {
    const {otp, email, newPassword} = req.body;
    if(!otp || !email || !newPassword){
        return res.status(400).json({status: false, message: "All fields are required"})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({status: false, message: "User not found"})
        }
        if(user.resetOtp = "" || user.resetOtp != otp){
            return res.status(400).json({status: false, message: "Invalid OTP"})
        }
        if(user.resetOtpExpiresAt < Date.now()){
            return res.status(400).json({status: false, message: "OTP Expired"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetOtp = "";
        user.resetOtpExpiresAt = 0;
        
        await user.save();
        return res.status(200).json({
            status: true, message: "Password Reset Successfully"
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message
        })
    }
}