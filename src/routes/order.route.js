import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { myOrders, orderDetails, placeOrder } from '../controllers/order.controller.js';

const orderRoute = express.Router();

orderRoute.post('/place-order', isAuthenticated, placeOrder);
orderRoute.get('/get-myOrder', isAuthenticated, myOrders);
orderRoute.get('/orderDetails/:orderId', isAuthenticated, orderDetails);

export default orderRoute;