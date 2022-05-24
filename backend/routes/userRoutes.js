import express from 'express'
const router = express.Router()

import { protect } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)
                        .put(protect, updateUserProfile)

export default router