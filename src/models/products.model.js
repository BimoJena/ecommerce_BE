import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" }
}, { timestamps: true });

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
    discountedPrice: {
        type: Number,
        default: null
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
    subcategory: {
        type: String,
        default: null
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: null
    },
    reviews: [reviewSchema]
},{timestamps: true});

export const productModel = mongoose.model("Product", productSchema);