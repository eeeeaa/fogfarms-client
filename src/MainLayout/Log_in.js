import {Button,FormGroup,FormControl,ControlLabel, Form, Container,Image,Row,Col} from "react-bootstrap";
import React, {useState} from "react";
import '../css_sheet/login.css';
import '../css_sheet/global_theme.css'
import Logo from '../image/Dashboard_Logo.png'
function Login(props){
    const [email,setEmail] = useState(""); //use useState to store variable
            //store in variable email, change the stored value with setEmail
    const [password, setPassword] = useState("");
    function validateForm(){
        return email.length > 0 && password.length > 0;
    }
    function handleSubmit(event){
        event.preventDefault();
    }
    return(
        <Container fluid className="Login">
            <Image className="fluid mx-auto d-block" src= {Logo} fluid />
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="Email">
                    <Form.Label>Email Address</Form.Label>
                    <FormControl 
                        autoFocus
                        type="email"
                        value={email} 
                        onChange = {e => setEmail(e.target.value)}
                        placeholder="name@example.com"/>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <FormControl 
                        type="password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)} 
                        placeholder="enter password here"/>
                </Form.Group>
                <Button block bsSize="large" disabled ={!validateForm()} type="submit">
                    Enter
                </Button>
            </form>
        </Container>
    );
}
export default Login;