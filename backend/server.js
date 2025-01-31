import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.route.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app =express();

app.use(cors());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.json());


const start =async()=>{
    const connectDB=await mongoose.connect("mongodb+srv://vermasumitcse:Major-Project-2025@linkup.y89af.mongodb.net/?retryWrites=true&w=majority&appName=LinkUp")

    app.listen(9080,()=>{
        console.log("Server is running on port 9090");
    })
}
start();
