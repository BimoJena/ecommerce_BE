import express from 'express';
import {isAuthenticated} from '../middlewares/auth.middleware.js';
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from '../controllers/cart.controller.js';

const cartRoute = express.Router();

cartRoute.post("/add-to-cart", isAuthenticated, addToCart);
cartRoute.get("/get-cart", isAuthenticated, getCart);
cartRoute.post("/update-cart", isAuthenticated, updateCartItem);
cartRoute.post("/remove/:productId", isAuthenticated, removeCartItem);
cartRoute.post("/clear-cart", isAuthenticated, clearCart);

export default cartRoute;