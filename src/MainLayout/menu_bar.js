import React from 'react';
import '../css_sheet/global_theme.css';
import { Navbar,Nav,NavDropdown, NavLink,Alert, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import app from '../axiosConfig';

function MenuBar(props){
    const serverName = 'https://salty-oasis-24147.herokuapp.com';
    const handleLogout = () => {
        app.get(serverName + '/auth/sign_out')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.status === 200){
                window.location.href = '/';
            }
            else{
                return(
                    <Alert variant={'danger'}>
                      assignment unsuccessful!
                    </Alert>
                  )
            }
        })    
        
      }
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
                        {/* <NavDropdown.Item>Profile</NavDropdown.Item> */}
                        <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MenuBar;