import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { topProducts } from '../actions/productActions'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTop = useSelector(state => state.productTop)
    const { loading, error, products } = productTop

    useEffect(()=>{
        dispatch(topProducts())
    },[dispatch])

  return (
      loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Carousel pause='hover' className='bg-dark' >
              {products.map(product => (
                  <Carousel.Item key={product._id}>
                      <Link to={`product/${product._id}`}>
                          <Image src={product.image} alt={product.name} />
                          <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                          </Carousel.Caption>
                      </Link>
                  </Carousel.Item>
              ))}
          </Carousel>
      )
  )
}

export default ProductCarousel