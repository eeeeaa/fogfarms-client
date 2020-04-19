import React from 'react';
import '../css_sheet/global_theme.css';
import { Navbar,Nav, Dropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { useHistory } from 'react-router-dom';
import app from './axiosConfig';

const MenuBar = () => {
    let history = useHistory();
    const url = 'https://salty-oasis-24147.herokuapp.com';
    return ( 
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
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
                <DropdownMenu>
                    <Dropdown.Item onClick={() => {
                        app.get(url + '/auth/sign_out').then((res) => {
                            if (res.status === 200) {
                                console.log('u r signing out, return to login page');
                                history.push("/")
                            }})
                    }}>SignOut</Dropdown.Item>
                </DropdownMenu>
            </Dropdown>
        </Navbar>
     );
}
 
export default MenuBar;