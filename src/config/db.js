import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// OLD CODE - For traditional server (Render)
// const connectDB = () => {
//     mongoose.connect(process.env.MONGODB_URI)
//     .then(()=>{
//         console.log('mongodb connected successfully');
//     })
//     .catch((err)=>{
//         console.log(`mongodb connection failed: ${err}`);
//     })
// }

// NEW CODE - Optimized for Vercel serverless functions
// Prevents timeout issues by reusing existing connections
let isConnected = false;

const connectDB = async () => {
    // If already connected, reuse the connection
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        // Configure mongoose for serverless environment
        mongoose.set('strictQuery', false);
        
        // Connect with optimized settings for Vercel
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log(`MongoDB connection failed: ${err}`);
        throw err;
    }
}

export default connectDB;