import express from 'express'
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import productRoute from './routes/product.route.js';
import categoryRotue from './routes/category.route.js';
import cartRoute from './routes/cart.route.js';
import orderRoute from './routes/order.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// API end-points
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/category', categoryRotue);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

export default app;