import express from 'express';
import { createProduct, getAllProduct } from '../controllers/product.controller.js';
import {isAuthenticated} from '../middlewares/auth.middleware.js';
import {isAdmin} from '../middlewares/admin.middleware.js';
import multer from 'multer';


const productRoute = express.Router();
const upload = multer({storage: multer.memoryStorage()});


productRoute.post('/create-product', isAuthenticated, isAdmin, upload.single('images'), createProduct);
productRoute.get('/get-all-product', isAuthenticated, getAllProduct);

export default productRoute;