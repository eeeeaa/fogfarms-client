import { Button, FormControl, Form, Container, Image } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/login.css';
import '../css_sheet/global_theme.css';
import Logo from '../image/Dashboard_Logo.png';
function Login(props) {
  	const [org_id, setID] = useState(''); 
  //use useState to store variable
	//store in variable email, change the stored value with setEmail
	const [password, setPassword] = useState('');
  	const serverName = 'https://salty-oasis-24147.herokuapp.com';
  
	function validateForm() {
		return org_id.length > 0 && password.length > 0;
	}
	function handleSubmit(event) {
		event.preventDefault();
		console.log(org_id + ' ' + password);
		// console.log(serverName.concat('/auth/sign_in'));
		const data = {
			username: org_id,
			password: password,
		};
		app.post(serverName + '/auth/sign_in', data).then((res) => {
			console.log(res);
			if (res.status === 200) {
				console.log("logging in")
				props.history.push('/main');
			} else {
				console.log("sucksssss")
			}
		});
	}
	return (
		<Container fluid className="Login">
			<Image className="fluid mx-auto d-block" src={Logo} fluid />
			<form onSubmit={handleSubmit}>
				<Form.Group controlId="Email">
					<Form.Label>Email Address</Form.Label>
					<FormControl
						autoFocus
						type="string"
						value={org_id}
						onChange={(e) => setID(e.target.value)}
						placeholder="organization id"
					/>
				</Form.Group>
				<Form.Group controlId="Password">
					<Form.Label>Password</Form.Label>
					<FormControl
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="enter password here"
					/>
				</Form.Group>
        <Button block bsSize="large" 
                disabled={!validateForm()} 
                type="submit">
					LogIn
				</Button>
			</form>
		</Container>
	);
}
export default Login;