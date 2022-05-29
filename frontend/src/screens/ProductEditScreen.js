import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listProductDetails, updateProduct } from '../actions/productActions'


const ProductEditScreen = () => { 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('') 
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('') 
    const [countInStock, setCountInStock] = useState(0)
    
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: 'PRODUCT_UPDATE_RESET' })
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id!==id){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setDescription(product.description)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, id, product, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id, name, price, image, description, brand, category, countInStock
        }))
    }
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/uploads', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
      <>
        <Link to='/admin/productlist' className='btn btn-dark my-3'>
            Go back
        </Link>
      
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/>
            :
        error ? <Message variant='danger'>{error}</Message>
            :
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setImage(e.target.value)} />
                <Form.Control type='file' label='Choose image' onChange={uploadFileHandler}></Form.Control>
                {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='brand' className='my-2'>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
                <Form.Label>CountInStock</Form.Label>
                <Form.Control type='text' placeholder='Enter CountInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </Form.Group>

            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        
    }
    </FormContainer>
    
    </>
  )
}

export default ProductEditScreen
