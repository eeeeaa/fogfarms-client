import React from 'react';
import '../css_sheet/global_theme.css';
import { Navbar,Nav,NavDropdown, NavLink,Alert, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function MenuBar(){
    return(
        <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
            <Navbar.Brand >FogFarms</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/manage-select' exact>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/dash' exact>
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <Nav.Link>Alert</Nav.Link>
                    <Nav.Link>Timer</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title = "Account">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                        <NavDropdown.Item>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MenuBar;