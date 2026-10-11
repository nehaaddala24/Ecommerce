const user = require("../models/user");
const bcryptjs=require("bcryptjs");
const { makeToken }=require("../utils/makeToken");

exports.register=async(req,res,next)=>{
    try{
        console.log("data:",req.body);
        const {name,email,password,confirmPassword}=req.body;
        

        if(!name){
            return res.status(404).json({
                message:"name not found"
            })
        }
        if(!email){
            return res.status(404).json({
                message:"email not found"
            })
        }
        if(!password || !confirmPassword){
            return res.status(404).json({
                message:"Enter password or confirm password"
            })
        }
        if(password!=confirmPassword){
            return res.status(404).json({
                message:"password and confirm password are not same"
            })
        }
        const hashedPassword=await bcryptjs.hash(password,10);
        const User=await user.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            id:User._id,
            name:User.name,
            email:User.email
            
        })
    }
    catch(err){
        next(err)
    }
}

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            return res.status(401).json({
                message:"email not found"
            })
        }
        if(!password){
            return res.status(401).json({
                message:"Password not found"
            })
        }
        const User=await user.findOne({email}).select("+password");

        if(!User){
            return res.status(401).json({
                message:"User not  exist"
            })
        }
        const ok=await bcryptjs.compare(password,User.password);

        if(!ok){
            return res.status(400).json({
                message:"Invalid password or email"
            })
        }
        res.status(200).json({
            token:makeToken(User)
        })
    }
    catch(err){
        next(err);
    }
}