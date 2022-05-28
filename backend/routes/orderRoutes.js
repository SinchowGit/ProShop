import express from 'express'
import { createOrder, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router