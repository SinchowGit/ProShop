import asyncHandler from 'express-async-handler'
import Product from '../model/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler( async (req,res) => {
    const products = await Product.find({})

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

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct}