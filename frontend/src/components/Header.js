import React from 'react'

import {LinkContainer} from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Header = () => {
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
                        <LinkContainer to='/login'>
                            <Nav.Link><i className='fa fa-user'></i>Sign in</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header