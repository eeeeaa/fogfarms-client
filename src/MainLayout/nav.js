import React from 'react';
import '../css_sheet/global_theme.css';
import { Navbar,Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function MenuBar(){
    return(
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand >FogFarms</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto">
                <LinkContainer to='/' exact>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to = '/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}
export default MenuBar;