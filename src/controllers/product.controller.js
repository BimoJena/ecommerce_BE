import {productModel} from '../models/products.model.js';
import {categoryModel} from '../models/category.model.js';
import uploadFile from '../config/storage.service.js';


// admin will create new product
export const createProduct = async (req, res) => {
    const {productName, productDescription, productPrice, stock, category} = req.body;
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
            productName, productDescription, productPrice, stock, category, images: [result.url]
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