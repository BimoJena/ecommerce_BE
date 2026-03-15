import express from 'express';
import { createProduct, getAllProduct, getProductById, getFeaturedProducts, addReview } from '../controllers/product.controller.js';
import {isAuthenticated} from '../middlewares/auth.middleware.js';
import {isAdmin} from '../middlewares/admin.middleware.js';
import multer from 'multer';

const productRoute = express.Router();
const upload = multer({storage: multer.memoryStorage()});

productRoute.post('/create-product', isAuthenticated, isAdmin, upload.single('images'), createProduct);
productRoute.get('/get-all-product', isAuthenticated, getAllProduct);
productRoute.get('/featured', getFeaturedProducts);
productRoute.get('/:productId', getProductById);
productRoute.post('/:productId/add-review', isAuthenticated, addReview);

export default productRoute;