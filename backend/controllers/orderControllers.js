import asyncHandler from 'express-async-handler'
import Order from '../model/orderModel.js'

// @desc    create a order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler( async (req,res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        await order.save()

        res.status(201).json(order)
    }
})

export { createOrder }