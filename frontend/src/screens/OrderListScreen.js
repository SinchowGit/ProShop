import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Button, Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getOrders } from '../actions/orderActions'


const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const ordersList = useSelector(state => state.ordersList)
    const { loading: loadingOrders, error: errorOrders, orders } = ordersList

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigate('/login')
        }
        
        dispatch(getOrders())
    }, [userInfo, navigate, dispatch])
    
  return (
        <>
            <h2>Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : 
            orders.length === 0 ? <Message variant='danger'>No orders</Message> : (
                <Table striped bordered hover responsive  size="sm">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>USER</td>
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
                                <td>{order.user.name}</td>
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
        </>
  )
}

export default OrderListScreen