import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { deleteProduct, listProducts } from '../actions/productActions'

function ProductListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            navigate('/login')
        }
        
    },[dispatch, userInfo, navigate, successDelete])

    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col style={{'text-align': 'right'}}>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className="fa-solid fa-plus"></i> Create Product
                </Button>
            </Col>
        </Row>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered responsive hover size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={e => deleteProductHandler(product._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ProductListScreen