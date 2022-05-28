import asyncHandler from 'express-async-handler'
import Order from '../model/orderModel.js'

// @desc    Create a order
// @route   POST /api/orders
// @access  Private
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
        const createdOrder = await order.save()
        if(createOrder){
            res.status(201).json(createdOrder)
        }else{
            throw new Error('Something went wrong')
        }
        
    }
})

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler( async (req,res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId).populate('user', 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler( async (req,res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        
        await order.save()

        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorderes
// @access  Private
const getMyOrders = asyncHandler( async (req,res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (admin only)
const getOrders = asyncHandler( async (req,res) => {
    const orders = await Order.find({}).populate('user', '_id name')
    res.json(orders)
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private (admin only)
const updateOrderToDelivered = asyncHandler( async (req,res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        await order.save()

        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered }