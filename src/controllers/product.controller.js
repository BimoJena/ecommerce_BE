import {productModel} from '../models/products.model.js';
import {categoryModel} from '../models/category.model.js';
import uploadFile from '../config/storage.service.js';


// admin will create new product
export const createProduct = async (req, res) => {
    const {productName, productDescription, productPrice, stock, category, discountedPrice, subcategory, featured} = req.body;
    if(!productName || !productDescription || !productPrice || !category){
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        })
    }
    if(!req.file){
        return res.status(400).json({
            status: false,
            message: "Product image is required"
        })
    }
    try{
        const categoryExists = await categoryModel.findById(category);
        if(!categoryExists){
            return res.status(400).json({status: false, message: "Invalid category"});
        }
        const result = await uploadFile(req.file.buffer);
        const product = await productModel.create({
            productName, productDescription, productPrice, stock, category,
            discountedPrice: discountedPrice || null,
            subcategory: subcategory || null,
            featured: featured === 'true' || featured === true,
            images: [result.url]
        });

        return res.status(201).json({
            status: true,
            message: "Product created successfully",
            product
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// get all product
export const getAllProduct = async (req,res) => {
    try{
        const product = await productModel.find()
        if(product.length == 0){
            return res.status(401).json({
                status: false,
                message: "No product exists"
            })
        }
        return res.status(200).json({
            status: true,
            message: "All Products",
            product
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

// get single product by id
export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await productModel.findById(productId).populate("category");
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        return res.status(200).json({ status: true, product });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}

// get featured products
export const getFeaturedProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 8;
    try {
        const products = await productModel.find({ featured: true }).limit(limit);
        return res.status(200).json({ status: true, products });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}

// add review to product
export const addReview = async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    if (!rating) {
        return res.status(400).json({ status: false, message: "Rating is required" });
    }
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            return res.status(400).json({ status: false, message: "You have already reviewed this product" });
        }

        product.reviews.push({
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment || ""
        });

        // recalculate average rating
        product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

        await product.save();
        return res.status(201).json({ status: true, message: "Review added", rating: product.rating });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}