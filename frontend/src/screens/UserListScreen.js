import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { deleteUser, listUser } from '../actions/userActions'

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }else{
            navigate('/login')
        }
        
    },[dispatch, userInfo, navigate, successDelete])

    const deleteUserHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }

  return (
    <>
        <h1>Users</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered responsive hover size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? 
                                    <i className='fa-solid fa-check' style={{color: 'green' }}></i>
                                    :
                                    <i className='fa-solid fa-xmark' style={{color: 'red' }}></i>
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/users/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={e => deleteUserHandler(user._id)}>
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

export default UserListScreen