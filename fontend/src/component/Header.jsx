import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <>
        <Navbar bg="dark" variant='dark'>
        <Container fluid>
            <Navbar.Brand><NavLink to='/' className='text-decoration-none text-light'>MANAGE</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link><NavLink to='/' className='text-decoration-none text-light'>Home</NavLink></Nav.Link>
                <Nav.Link><NavLink to='/product' className='text-decoration-none text-light'>Product</NavLink></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  )
}

export default Header