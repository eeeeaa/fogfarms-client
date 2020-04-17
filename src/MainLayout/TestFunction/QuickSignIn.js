import React, { Component } from 'react';
import axios from 'axios';
import app from '../axiosConfig';

class SignInButton extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		const data = {
			username: 'ddfsddnotadmin',
			password: 'hihi',
		};
		return (
			<button
				onClick={() =>
					app.post(url + '/auth/sign_in', data).then((res) => {
						console.log('hihihi');
						console.log(res);
						if (res.status === 200) {
							console.log('temp sign in working');
						} else {
							console.log('nope');
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
