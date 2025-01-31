import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

import bcrypt from 'bcrypt';

export const register= async(req,res)=>{
    try{

        const{name,email,password,username}=req.body;

        if(!name ||!email ||!password ||!username) {
            return res.status(400).json({message:"All field are required"})
        };

        const user=await User.findone({
            email
        });

        if(user){
            return res.status(400).json({message:"User already exists"})
        };

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            username
        });
        await newUser.save();

        const profile=new Profile({userId:newUser._id});

        return res.json({message:"User Created"});
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
  }
  