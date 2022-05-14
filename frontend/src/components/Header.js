import React from 'react'

import { Container, Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href="/">proShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="">
                        <Nav.Link href="/cart"><i className='fa fa-cart-shopping'></i>  Cart</Nav.Link>
                        <Nav.Link href="/login"><i className='fa fa-user'></i>Sign in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header