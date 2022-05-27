import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Authenticate users & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (req,res) => {
    const { email, password} = req.body

    const user = await User.findOne({ email })

    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req,res) => {
    const { name, email, password} = req.body

    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get users list
// @route   GET /api/users
// @access  Private (only admin)
const getUsers = asyncHandler( async (req,res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (only admin)
const deleteUser = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({ message: 'User removed' })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private (only admin)
const getUserById = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }