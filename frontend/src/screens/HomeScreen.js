import React, { useEffect} from 'react'

import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { keyword, pageNumber } = useParams()
  const productList = useSelector(state => state.productList)
  const { loading, products, error, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch, keyword,pageNumber])

  return (
    <>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader/>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
          </>
        )}
    </>
  )
}

export default HomeScreen