import React, { useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'


const LoginScreen = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : ''

    useEffect(() => {
        if(userInfo){
            navigate(`/${redirect}`)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(email)
        dispatch(login(email, password))
    }
    
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {loading && <Loader/>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Costomer? {' '}
                <Link to={`/register?redirect=${redirect}`}>Register</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen