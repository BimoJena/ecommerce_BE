import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import { myOrders, orderDetails, placeOrder, updateOrderStatus, getAllOrders } from '../controllers/order.controller.js';

const orderRoute = express.Router();

orderRoute.post('/place-order', isAuthenticated, placeOrder);
orderRoute.get('/get-myOrder', isAuthenticated, myOrders);
orderRoute.get('/orderDetails/:orderId', isAuthenticated, orderDetails);
orderRoute.patch('/:orderId/status', isAuthenticated, isAdmin, updateOrderStatus);
orderRoute.get('/all-orders', isAuthenticated, isAdmin, getAllOrders);

export default orderRoute;