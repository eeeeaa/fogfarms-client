import React, { Component } from 'react';
import app from '../functions/axiosConfig';

class SignInButton extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		const data = {
			username: 'ddfsdd9',
			password: 'hihi',
		};
		return (
			<button
				onClick={() =>
					app.post(url + '/auth/sign_in', data).then((res) => {
						if (res.status === 200) {
							console.log('Auth: Signing In');
						} else {
							console.log('Auth: Failed');
						}
					})
				}
			>
				Temporary Signin
			</button>
		);
	}
}

export default SignInButton;
