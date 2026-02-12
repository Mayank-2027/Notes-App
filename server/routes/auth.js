import express from 'express';
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.post('/register',async(req,res)=>{

    try{
        const {name,email,password}=req.body;
        const user= await User.findOne({email});
        if(user){
            return res.status(401).json({success : false ,message : "user already found"} )
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newUser = new User({
            name ,email,password:hashPassword
        })
           await newUser.save()
         res.status(200).json({success :true,message : "Account Create Succesfully"})
    } catch(error){
        res.status(500).json({success :false,message : "Error in adding User "});
        console.log("REGISTER ERROR:", error);
    }
});

router.post('/login',async(req,res)=>{

    try{
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({success : false ,message : "user not existed"} )
        }

        const checkpassword=await bcrypt.compare(password,user.password)

        if(!checkpassword){
            return res.status(401).json({success:false,message:"Wrong Credential"})
        }

        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn:"5h"})
           
         res.status(200).json({success :true,token,user :{name:user.name},message : "Login Succesfully"})
    } catch(error){
        res.status(500).json({success :false,message : "Error in Login "});
        console.log("REGISTER ERROR:", error);
    }
})

export default router;