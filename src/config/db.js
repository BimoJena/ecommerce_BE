import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('mongodb connected successfully');
    })
    .catch((err)=>{
        console.log(`mongodb connection failed: ${err}`);
    })
}

export default connectDB;