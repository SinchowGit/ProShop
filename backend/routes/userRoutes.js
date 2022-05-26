import express from 'express'
const router = express.Router()

import { admin, protect } from '../middleware/authMiddleware.js'
import { authUser, deleteUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userControllers.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)

export default router