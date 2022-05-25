import React, { useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getMyOrders } from '../actions/orderActions'


const ProfileScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrders = useSelector(state => state.myOrders)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrders

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(user.name){
                setName(user.name)
                setEmail(user.email)

                dispatch(getMyOrders())
            }else{
                dispatch(getUserDetails('profile'))
            }
        }
    }, [userInfo, navigate, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            setMessage()
        }
    }
    
  return (
    <Row>
        <Col md={3}>
            <h2>Profile</h2>
            {loading && <Loader/>}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{error}</Message> : 
            orders.length === 0 ? <Message variant='danger'>No orders</Message> : (
                <Table striped bordered hover responsive  size="sm">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>DATE</td>
                            <td>TOTAL</td>
                            <td>PAID</td>
                            <td>DELIVERED</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : <i class="fa-solid fa-xmark" style={{color: 'red'}}></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i class="fa-solid fa-xmark" style={{color: 'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen