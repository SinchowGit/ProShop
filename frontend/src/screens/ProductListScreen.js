import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import { createProduct, deleteProduct, listProducts } from '../actions/productActions'

function ProductListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { pageNumber } = useParams()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
    
    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    useEffect(()=>{
        dispatch({ type: 'PRODUCT_CREATE_RESET'})
        console.log(window.location.pathname)
        if(!userInfo || !userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/products/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
        
    },[dispatch, userInfo, navigate, successDelete, successCreate, createdProduct, pageNumber])

    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col style={{'textAlign': 'right'}}>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className="fa-solid fa-plus"></i> Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
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
            <Paginate page={page} pages={pages} />
            </>
        )}
    </>
  )
}

export default ProductListScreen