import {Button,FormControl, Form, Container,Image} from "react-bootstrap";
import React, {useState} from "react";
import '../css_sheet/login.css';
import '../css_sheet/global_theme.css';
import Logo from '../image/Dashboard_Logo.png';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDashboard: false,
            email: "",
            password: "",
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
     }
    handleEmail = (event) => this.setState({ email: event.target.value });
    handlePassword = (event) => this.setState({ password: event.target.value });
    handleSubmit = () => {
      this.setState(()=>({
          toDashboard: true
      }))
    }

    render() {
      if (this.state.toDashboard) {
        return <Redirect to='/main'/>
      }
      return (
        <Container fluid className="Login">
            <Image className="fluid mx-auto d-block" src= {Logo} fluid />
            <form>
                <Form.Group controlId="Email">
                    <Form.Label>Email Address</Form.Label>
                    <FormControl 
                        autoFocus
                        type="email"
                        value={this.state.email} 
                        onChange = {this.handleEmail}
                        placeholder="name@example.com"/>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <FormControl 
                        type="password"
                        value = {this.state.password}
                        onChange = {this.handlePassword} 
                        placeholder="enter password here"/>
                </Form.Group>
                <Button
                    block bsSize = 'large'
                    type = 'submit' 
                    onSubmit = {this.handleSubmit}
                >
                enter
                </Button>
            </form>
        </Container>
      )
    }
  }

export default Login;