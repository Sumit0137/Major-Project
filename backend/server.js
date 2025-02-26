


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

// Use the routes for posts and users
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))

const start = async () => {
  try {
    // Get Mongo URI from environment variable
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error("❌ MONGO_URI is not defined in .env. Please check your .env file.");
      process.exit(1); // Exit the application if the Mongo URI is not found
    }

    // Connect to MongoDB (no need for useNewUrlParser and useUnifiedTopology options anymore)
    await mongoose.connect(mongoURI);
    
    // Start the server if connection is successful
    app.listen(9080, () => {
      console.log("✅ Server is running on port 9080");
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

start();

