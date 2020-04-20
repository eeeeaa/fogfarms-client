import { Button, FormControl, Form, Container, Image } from 'react-bootstrap';
import React, { useState } from 'react';
import '../../css_sheet/login.css';
import '../../css_sheet/global_theme.css';
import Logo from '../../image/Dashboard_Logo.png';
import app from '../functions/axiosConfig';
import { useHistory } from 'react-router-dom';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const url = 'https://salty-oasis-24147.herokuapp.com';
	let history = useHistory();
	function validateForm() {
		return email.length > 0 && password.length > 0;
	}
	function handleSubmit(event) {
		event.preventDefault();
		const data = {
			username: email,
			password: password,
		};
		app.post(url + '/auth/sign_in', data).then((res) => {
			if (res.status === 200) {
				history.push('/management_select');
			} else {
				console.log('Auth: login fail');
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="name@example.com"
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
				<Button block bsSize="large" disabled={!validateForm()} type="submit">
					LogIn
				</Button>
			</form>
		</Container>
	);
}
export default Login;
