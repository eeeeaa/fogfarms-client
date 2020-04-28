import React, { useContext } from "react";
import "../css_sheet/global_theme.css";
import { Navbar, Nav, NavDropdown, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import app from "./functions/axiosConfig";
import { ModuleDataContext } from "./contexts/ModuleDataContext";

const MenuBar = () => {
  let history = useHistory();

  const signOut = () => {
    try {
      app.get("/auth/sign_out").then((res) => {
        if (res.status === 200) {
          console.log("Auth: Signing Out");
          history.push("/");
        }
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>FogFarms</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/manage-select" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/dashboard" exact>
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer> */}
          <Nav.Link>Alert</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Account">
            {/* <NavDropdown.Item>Profile</NavDropdown.Item> */}
            <NavDropdown.Item onClick={() => signOut()}>
              SignOut
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuBar;
