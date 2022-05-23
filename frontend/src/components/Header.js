import React from 'react'

import {LinkContainer} from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>proShop</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fa fa-cart-shopping'></i>  Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='userName'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fa fa-user'></i>Sign in</Nav.Link>
                            </LinkContainer>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header