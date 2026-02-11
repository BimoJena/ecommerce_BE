import { categoryModel } from "../models/category.model.js";

export const createCategory = async (req,res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({status:false, message: "Category name is required"})
    }
    try{
        const existing = await categoryModel.findOne({name});
        if(existing){
            return res.status(400).json({
                status: false,
                message: "Category already exists"
            })
        }
        const category = await categoryModel.create({name});
        return res.status(201).json({
            status: true,
            message: "Category created successfully",
            category
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    return res.status(200).json({
      status: true,
      categories
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
};