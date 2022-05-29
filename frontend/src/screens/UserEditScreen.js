import React, { useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { getUserDetails, updateUser } from '../actions/userActions'


const UserEditScreen = () => { 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false) 

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigate('/login')
        }else{
            if(successUpdate){
                dispatch({ type: 'USER_UPDATE_RESET' })
                dispatch({ type: 'USER_DETAILS_RESET' })
                navigate('/admin/userlist')
            }else{
                if(!user.name || user._id!==id){
                    dispatch(getUserDetails(id))
                }else{
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
            }
        }
    }, [dispatch, id, user, successUpdate, navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: id,
            name,
            email,
            isAdmin
        }))
    }
    
  return (
      <>
        <Link to='/admin/userlist' className='btn btn-dark my-3'>
            Go back
        </Link>
      
    <FormContainer>
        <h1>Edit User</h1>
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

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='isAdmin' className='my-2'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
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

export default UserEditScreen
