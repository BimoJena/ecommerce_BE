import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    }, 
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    images: [
        {
            type: String, //image url
            required: true
        }
    ]
},{timestamps: true});

export const productModel = mongoose.model("Product", productSchema);