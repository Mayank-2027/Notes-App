import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv';

dotenv.config();

const middleware = async(req,res,next)=>{
    try{
        const authHeader = req.header('Authorization');
        const token = authHeader?.split(' ')[1];

        if(!token){
            return res.status(401).json({success :false,message :"Unathorized"})
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success :false,message :"Wrong Token"})
        }

        const user = await User.findById({_id : decoded.id})

        if(!user){
            return res.status(401).json({success :false,message :"No user"})
        }
        const newUser ={name : user.name,id:user._id}
        req.user = newUser
        next()
    }catch(error){
        return res.status(500).json({success :false,message :"please login"})
    }
}

export default middleware ;
