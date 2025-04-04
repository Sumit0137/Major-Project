import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import PdfDocument from 'pdfkit';
import fs from "fs";
import ConnectionRequest from "../models/connections.model.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js"
// import { ConnectionStates } from "mongoose";


const convertUserDataToPdf= async(userData)=>{
    const doc=new PdfDocument();
    const outputPath=crypto.randomBytes(32).toString("hex")+".pdf";
    const stream=fs.createWriteStream("uploads/"+outputPath);

    doc.pipe(stream);

    // doc.image(`uploads/${userData.userId.profilePicture}` , {align:"center",width:100,})
    // Define circle properties
    // const imageX = 250; // Adjust for centering
    // const imageY = 50;  // Position at top
    // const imageRadius = 50;

    // if (userData.userId.profilePicture) {
    //     doc.save();
    //     doc.circle(imageX + imageRadius, imageY + imageRadius, imageRadius).clip();
    //     doc.image(`uploads/${userData.userId.profilePicture}`, imageX, imageY, {
    //         width: imageRadius * 2,
    //         height: imageRadius * 2
    //     });
    //     doc.restore();
    // }



    // doc.fontSize(14).text(`Name: ${userData.userId.name}`);
    // doc.fontSize(14).text(`Username: ${userData.userId.username}`);
    // doc.fontSize(14).text(`Email: ${userData.userId.email}`);
    // doc.fontSize(14).text(`Bio: ${userData.bio}`);
    // doc.fontSize(14).text(`Current Position:${userData.currentPost}`);
    // // doc.fontSize(14).text(`Current Position:${work.position}`);


    // doc.fontSize(14).text("Past Work: ")
    // userData.pastWork.forEach((work,index)=>{
    //     doc.fontSize(14).text(`Company Name:${work.company}`);
    //     doc.fontSize(14).text(`Position:${work.position}`);
    //     doc.fontSize(14).text(`Years:${work.years}`)

    // })
    // doc.end();
   
    // return outputPath;

// }
// Add Profile Picture
// Draw Circular Profile Picture

    // Draw Circular Profile Picture (Left-Aligned)
   
    // Draw Circular Profile Picture (Left-Aligned)
    if (userData.userId.profilePicture) {
        const imgX = 50; // Left aligned
        const imgY = doc.y; // Current Y position
        const imgSize = 100; // Image size
    
        // Draw circular profile picture
        doc
            .save()
            .circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2) // Perfect Circle
            .clip()
            .image(`uploads/${userData.userId.profilePicture}`, imgX, imgY, {
                width: imgSize,
                height: imgSize,
            })
            .restore();
    
        doc.y = imgY + imgSize + 15; // Move Y position below the image with enough gap
    }
    
    // Name and Contact Information (Left Aligned)
    doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .text(`${userData.userId.name}`, { align: "left" })
        .moveDown(0.5);
    
    doc
        .fontSize(14)
        .font("Helvetica")
        .text(`Username: ${userData.userId.username}`, { align: "left" })
        .moveDown(0.5); // Extra spacing added
    
    doc
        .fontSize(14)
        .text(`Email: ${userData.userId.email}`, { align: "left" })
        .moveDown(1);
    
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(1);
    
    // Bio Section
    doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .text("Bio", { underline: true, align: "left" })
        .moveDown(0.5);
    
    doc
        .fontSize(12)
        .font("Helvetica")
        .text(userData.bio || "No bio provided", { align: "left" })
        .moveDown(1);
    
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(1);
    
    // Current Position
    // doc
    //     .fontSize(16)
    //     .font("Helvetica-Bold")
    //     .text("Current Position", { underline: true, align: "left" })
    //     .moveDown(0.5);
    
    // doc
    //     .fontSize(12)
    //     // .text(userData.currentPost || "Not specified", { align: "left" })
    //     // .text(userData.currentPost ? userData.currentPost : "Not specified", { align: "left" })
    //     .text(userData.currentPost && typeof userData.currentPost === "string" ? userData.currentPost : "Not specified", { align: "left" })
    //     .moveDown(1);
       
    // doc
    //     .moveTo(50, doc.y)
    //     .lineTo(550, doc.y)
    //     .stroke()
    //     .moveDown(1);
    

    
    // Past Work Experience
    doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .text("Past Work Experience", { underline: true, align: "left" })
        .moveDown(0.5);
    
    if (userData.pastWork && userData.pastWork.length > 0) {
        userData.pastWork.forEach((work) => {
            doc
                .fontSize(14)
                .font("Helvetica-Bold")
                // .text(`Company: ${work.companyName}`, { align: "left" })
                .text(`Company: ${work.company}`, { align: "left" })
                .moveDown(0.2);
    
            doc
                .fontSize(12)
                .font("Helvetica")
                .text(`Position: ${work.position}`, { align: "left" })
                .moveDown(0.2);
    
            doc
                .fontSize(12)
                .text(`Years: ${work.years}`, { align: "left" })
                .moveDown(0.8);
        });
    } else {
        doc
            .fontSize(12)
            .text("No past work experience listed", { align: "left" })
            .moveDown(1);
    }
    
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(1);
    
    // End the PDF
    doc.end();
    
    return outputPath;
    
};

export const register= async(req,res)=>{
 
    console.log(req.body);
    try{
        const{name,email,password,username}=req.body;

        if(!name || !email || !password || !username) return res.status(400).json({message:"All field are required"});

        const user= await User.findOne({
            email
        });

        if(user) return res.status(400).json({message:"User already exists"})
    

        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            username
        });

        await newUser.save();
        const profile =new Profile({userId: newUser._id});

        await profile.save()

        return res.json({message:"User Created"})
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
  }
  

  export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password) return res.status(400).json({message:"All field are required"})
            
            const user=await User.findOne({
                email
            });

            if(!user) return res.status(404).json({message:"User does not exist"})

            const isMatch=await bcrypt.compare(password,user.password);

            if(!isMatch)return res.status(400).json({message:"Invalid Credentials"})


            const token=crypto.randomBytes(32).toString("hex");

            await User.updateOne({_id:user._id},{token});
            return res.json({token:token})
        } catch(error){
            return res.status(500).json({message:error.message})
        }

  }

//   export const uploadProfilePicture=async(req,res)=>{
//     const{token}=req.body;

//     try{
//         const user=await User.findOne({token:token});

//         if(!user){
//             return res.status(404).json({message:"user not found"})
//         }
//         user.ProfilePicture=req.file.filename;
//         await user.save();

//         return res.json({message:"Profile Picture Upload"})
//     }catch(error){
//         return res.status(500).json({message:error.message})
//     }
//   }

// export const uploadProfilePicture = async (req, res) => {
//     const { token } = req.body;

//     try {
//         // 🔹 Check if a file was uploaded
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         // 🔹 Find the user by token
//         const user = await User.findOne({ token: token });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // 🔹 Update the user's profile picture
//         user.profilePicture = req.file.filename;
//         await user.save();

//         // 🔹 Return the new profile picture path
//         return res.json({
//             message: "Profile picture uploaded successfully",
//             profilePicture: req.file.filename,  // 👈 Return the new image path
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const uploadProfilePicture = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the correct field
        user.profilePicture = req.file.filename;  
        await user.save();

        return res.json({
            message: "Profile Picture Uploaded",
            profilePicture: user.profilePicture,  // Send the updated image path
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





// Updating and getting User Profile
  export const updateUserProfile=async(req,res)=>{
    try{
        const {token,...newUserData}=req.body;

        const user=await User.findOne({token:token});

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const{username,email}=newUserData;

        const existingUser=await User.findOne({ $or:[{username},{email}]});

        if(existingUser) {
            if(existingUser || String(existingUser._id)!== String(user._id)){
                return res.status(400).json({message:"User already exists"})
            }
        }

        Object.assign(user,newUserData);
        await user.save();
        return res.json({message:"User Updated"})

    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
  }


  export const getUserAndProfile = async(req,res)=>{

    try{
        const {token}=req.query;
        const user =await User.findOne({token:token});

        if(!user){
            return res.status(404).json({message:"User Invalid found"})
        }

        const userProfile =await Profile.findOne({userId: user._id})
            .populate('userId','name email username profilePicture');

        return res.json(userProfile)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
  }

//   Exploring Pdf Download option
export const updateProfileData= async(req,res)=>{
    try{
        const {token, ...newProfileData}=req.body;

        const userProfile=await User.findOne({token:token});

        if(!userProfile) {
            return res.status(404).json({message:"User not found"})
        }

        const profile_to_update=await Profile.findOne({userId : userProfile._id})

        Object.assign(profile_to_update,newProfileData);
        await profile_to_update.save();

        return res.json({message:"Profile Updated"})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const getAllUserProfile=async (req,res)=>{
    try{
        const profiles=await Profile.find().populate('userId','name username email profilePicture');
        return res.json({profiles})
    } catch(error){
        return res.status(500).json({message:error.message})
    }
}

// Implementing the download Profile Function
export const downloadProfile=async (req,res)=>{

    const user_id=req.query.id;
    console.log(user_id)
    // return res.json({"message" :"Not Implemented"});

    const userProfile=await Profile.findOne({userId:user_id})
    .populate('userId','name username email profilePicture');

        let outputPath=await convertUserDataToPdf(userProfile);
        return res.json({"message":outputPath})

}

// Connection Request Functionality
export const sendConnectionRequest=async(req,res)=>{
    const{token,connectionId}=req.body;

    try{
        const user=await User.findOne({token});

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const connectionUser=await User.findOne({_id:connectionId});

        if(!connectionUser){
            return res.status(404).json({message:"Connection User not found"})
        }

        const existingRequest=await ConnectionRequest.findOne({
            userId:user._id,
            connectionId:connectionUser._id
        })

        if(existingRequest){
            return res.status(400).json({message:"Request already sent"})
        }

        const request=new ConnectionRequest({
            userId:user._id,
            connectionId:connectionUser._id
        })

        await request.save();

        return res.json({message:"Request Sent"})


    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const getMyConnectionsRequests = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({ userId: user._id })
            .populate("connectionId", "name username email profilePicture");

        return res.json({ connections });
    } catch (error) {
        console.error("Error fetching connection requests:", error);
        return res.status(500).json({ message: error.message });
    }
};


// export const getMyConnectionsRequests=async(req,res)=>{
//     const{token}=req.query;

//     try{
//         const user=await User.findOne({token});

//         if(!user){
//             return res.status(404).json({message:"User not found"})
//         }

//         const connections=await ConnectionRequest.findOne({userId:user._id}).populate(`connectionId`,`name username email profilePicture`);

//         return res.json({connections})
//     }catch(error){
//         return res.status(500).json({message:error.message})
//     }
// }





// export const getMyConnectionsRequests = async (req, res) => {
//     try {
//         // Extract token from query params instead of body
//         const { token } = req.query;

//         if (!token) {
//             return res.status(400).json({ message: "Token is required" });
//         }

//         // Find user by token
//         const user = await User.findOne({ token });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Get all connection requests for this user
//         const connections = await ConnectionRequest.find({ userId: user._id })
//             .populate("connectionId", "name username email profilePicture");

//         return res.json({ connections });
//     } catch (error) {
//         console.error("Error fetching connection requests:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };


export const WhatAreMyConnections=async (req,res)=>{
    const {token}=req.query;

    try{
        const user=await User.findOne({token});

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const connections=await ConnectionRequest.find({connectionId:user._id}).populate(`userId`,`name username email profilePicture`);

        return res.json(connections);

    } catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const acceptConnectionRequest=async (req,res)=>{
    const{token,requestId,action_type}=req.body;

    try{
        const user=await User.findOne({token});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const connection=await ConnectionRequest.findOne({_id:requestId});

        if(!connection){
            return res.status(404).json({message:"Connection not found"})
        }

        if(action_type==="accept"){
            connection.status_accepted=true;
        } else{
            connection.status_accepted=false;
        }

        await connection.save();
        return res.json({message:"Request Updated"})

    } catch(error){
        return res.status(500).json({message:error.message})
    }
}

// Implementing Crud Functionality
export const commentPost=async(req,res)=>{
    const{token,post_id,commentBody}=req.body;

    try{
        const user=await User.findOne({token:token}).select("_id");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const post= await Post.findOne({
            _id:post_id
        });

        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        
        const comment =new Comment({
            userId:user._id,
            postId:post_id,
            body:commentBody
        });

        await comment.save();

        return res.status(200).json({message:"Comment Added"})


    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const getUserProfileAndUserBasedOnUsername =async (req,res)=>{

    const {username} =req.query;
    try{
        const user=await User.findOne({
            username
        });

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const userProfile=await Profile.findOne({userId:user._id})
        .populate('userId','name username email profilePicture');

        return res.json({"profile":userProfile})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}