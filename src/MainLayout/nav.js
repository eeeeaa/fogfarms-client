import React, { useContext } from "react";
import "../css_sheet/global_theme.css";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { useHistory } from "react-router-dom";
import app from "./functions/axiosConfig";
import { ModuleDataContext } from "./contexts/ModuleDataContext";

const MenuBar = () => {
  let history = useHistory();
  const { timer } = useContext(ModuleDataContext);

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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>FogFarms</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        <LinkContainer to="/" exact>
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/dashboard">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <Nav.Link>Timer : {timer}</Nav.Link>
      </Nav>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <DropdownMenu>
          <Dropdown.Item onClick={() => signOut()}>SignOut</Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default MenuBar;
