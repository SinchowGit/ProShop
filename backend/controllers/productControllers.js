import asyncHandler from 'express-async-handler'
import Product from '../model/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler( async (req,res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const products = await Product.find({...keyword})

    res.json(products)
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id)
    
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete product by id
// @route   DELETE /api/products/:id
// @access  Private (admin only)
const deleteProduct = asyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id)
    
    if(product){
        await product.remove()
        res.json({ message: 'Product removed' })
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create sample product
// @route   POST /api/products
// @access  Private (admin only)
const createProduct = asyncHandler( async (req,res)=>{
    const product = new Product({
        name: 'Product Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Product Brand',
        category: 'Product Category',
        countInStock: 0,
        numReview: 0,
        description: 'Product Description'
    })

    await product.save()
    res.status(201).json(product)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (admin only)
const updateProduct = asyncHandler( async (req,res)=>{
    const { name, price, image, brand, category, countInStock, numReview, description } = req.body

    const product = await Product.findById(req.params.id)
    
    if(product){
        product.name = name || product.name 
        product.price = price || product.price 
        product.image = image || product.image 
        product.category = category || product.category 
        product.brand = brand || product.brand
        product.description = description || product.description
        product.numReview = numReview || product.numReview
        product.countInStock = countInStock || product.countInStock

        await product.save()
        res.status(201).json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler( async (req,res)=>{
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)
    
    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReview = product.reviews.length
        product.rating = product.reviews.reduce((acc,item) => acc+item.rating, 0) / product.reviews.length

        await product.save()
        res.status(201).json('Review added')
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}