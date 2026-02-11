import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import {createCategory, getAllCategories} from '../controllers/category.controller.js';

const categoryRotue = express.Router();

categoryRotue.post('/create-category', isAuthenticated, isAdmin, createCategory)
categoryRotue.get("/get-all-category", getAllCategories);

export default categoryRotue;