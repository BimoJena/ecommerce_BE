import {cartModel} from '../models/cart.model.js';
import {productModel} from '../models/products.model.js';


// add to cart
export const addToCart = async (req,res) => {
    const {productId, quantity} = req.body;
    const userId = req.user._id;
    if(!productId){
        return res.status(400).json({
            status: false, message: "Product ID required"
        })
    }
    try{
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({status: false, message: "Product not found"})
        }

        const effectivePrice = product.discountedPrice ?? product.productPrice;

        let cart = await cartModel.findOne({user: userId});

        if(!cart){
            cart = await cartModel.create({
                user: userId,
                items: [{
                    product: productId,
                    quantity: quantity || 1,
                    price: effectivePrice
                }],
                totalPrice: effectivePrice * (quantity || 1)
            })
        }else{
            const index = cart.items.findIndex(
                item => item.product.toString() === productId
            )
            if(index > -1){
                cart.items[index].quantity += quantity || 1;
            }else{
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1,
                    price: effectivePrice
                })
            }
            cart.totalPrice = cart.items.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            )

            await cart.save();
        }

        return res.status(200).json({
            status: true,
            message: "Product added to cart",
            cart
        })
    }catch(err){
        return res.status(500).json({status: false, message: "Internal Server Error", error: err.message});
    }
}

// get cart
export const getCart = async (req,res) => {
    try{
        const cart = await cartModel.findOne({user: req.user._id}).populate("items.product");
        return res.status(200).json({
            status: true,
            cart: cart || {items: [], totalPrice: 0}
        });
    }catch(err){
        return res.status(500).json({status: false, error: err.message});
    }
}

// update cart item
export const updateCartItem = async (req,res) => {
    const {productId, quantity} = req.body;
    if(!productId || quantity < 1){
        return res.status(400).json({
            status: false,
            message: "Invalid data"
        })
    }
    try{
        const cart = await cartModel.findOne({user: req.user._id});
        if(!cart){
            return res.status(400).json({
                status: false,
                message: "Cart not found"
            })
        }
        const item = cart.items.find(
            item => item.product.toString() === productId
        );
        if(!item){
            return res.status(404).json({
                status: false,
                message: "Item not in Cart"
            })
        }
        item.quantity = quantity;
        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        await cart.save();

        return res.status(200).json({
            status: true,
            message: "Cart updated",
            cart
        })
    }catch(err){
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// remove cart item
export const removeCartItem = async (req,res) => {
    const {productId} = req.params;
    try{
        const cart = await cartModel.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            })
        }
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        await cart.save();

        return res.status(200).json({
            status: true,
            message: "Item removed from cart",
            cart
        })
    }catch(err){
        return res.status(500).json({status: false, message: "Internal Server Error", error: err.message})
    }
}

// clear cart
export const clearCart = async (req,res) => {
    try{
        await cartModel.findOneAndDelete({user: req.user._id});
        return res.status(200).json({
            status: true,
            message: "Cart Cleared"
        });
    }catch(err){
        return res.status(500).json({status: false, message: "Internal server error", error: err.message});
    }
}