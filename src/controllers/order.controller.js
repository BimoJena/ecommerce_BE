import {orderModel} from '../models/order.model.js';
import { cartModel } from '../models/cart.model.js';

const TAX_RATE = 0.18;       // 18% GST
const SHIPPING_CHARGE = 50;  // flat ₹50 shipping

// place order API
export const placeOrder = async (req, res) => {
    const { paymentMethod, shippingAddress } = req.body;

    if (!paymentMethod || !shippingAddress) {
        return res.status(400).json({
            status: false,
            message: "Payment method and shipping address required"
        });
    }

    const { fullName, addressLine1, city, state, postalCode, country, phone } = shippingAddress;
    if (!fullName || !addressLine1 || !city || !state || !postalCode || !country || !phone) {
        return res.status(400).json({
            status: false,
            message: "All shipping address fields are required: fullName, addressLine1, city, state, postalCode, country, phone"
        });
    }

    try {
        const cart = await cartModel.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ status: false, message: "Cart is empty" });
        }

        const subtotal = cart.totalPrice;
        const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
        const shipping = SHIPPING_CHARGE;
        const totalAmount = parseFloat((subtotal + tax + shipping).toFixed(2));

        const order = await orderModel.create({
            user: req.user._id,
            items: cart.items,
            subtotal,
            tax,
            shipping,
            totalAmount,
            paymentMethod,
            shippingAddress
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(201).json({
            status: true,
            message: "Order placed successfully",
            order
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// my order API
export const myOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({ status: true, orders });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
};

// orderDetails API
export const orderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderModel.findOne({ _id: orderId, user: req.user._id }).populate("items.product");
        if (!order) {
            return res.status(404).json({ status: false, message: "Order not found" });
        }
        return res.status(200).json({ status: true, message: "Order Details", order });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}

// admin: update order status
export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const validStatuses = ["placed", "confirmed", "shipped", "out_for_delivery", "cancelled"];
    if (!orderStatus || !validStatuses.includes(orderStatus)) {
        return res.status(400).json({
            status: false,
            message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        });
    }
    try {
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ status: false, message: "Order not found" });
        }
        return res.status(200).json({ status: true, message: "Order status updated", order });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}

// admin: get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 }).populate("user", "name email");
        return res.status(200).json({ status: true, orders });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}