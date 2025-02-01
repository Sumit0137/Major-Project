import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app =express();

app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);



const start =async()=>{

    const connectDB=await mongoose.connect("mongodb+srv://Sumit:<MajorProject@2025>@majorproject.wvlel.mongodb.net/?")
    app.listen(9080,()=>{
        console.log("Server is running on port 9080");
    })
}
start();
