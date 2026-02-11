import {orderModel} from '../models/order.model.js';
import { cartModel } from '../models/cart.model.js';

// place order API
export const placeOrder = async (req, res) => {
    const {paymentMethod, shippingAddress} = req.body;

    if(!paymentMethod || !shippingAddress){
        return res.status(400).json({
            status: false,
            message: "Payment method and address required"
        });
    }

    try{
        const cart = await cartModel.findOne({user: req.user._id});
        if(!cart || cart.items.length === 0){
            return res.status(400).json({
                status: false,
                message: "Cart is empty"
            });
        }
        const order = await orderModel.create({
            user: req.user._id,
            items: cart.items,
            totalAmount: cart.totalPrice,
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
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// my order API
export const myOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });   

    return res.status(200).json({
      status: true,
      orders
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};


// orderDetails API
export const orderDetails = async (req,res) =>{
    const {orderId} = req.params;
    try{
        const order = await orderModel.findOne({_id: orderId, user: req.user._id}).populate("items.product");
        if(!order){
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "My Orders",
            order
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}