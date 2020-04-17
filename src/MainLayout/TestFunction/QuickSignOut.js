import React, { Component } from 'react';
import axios from 'axios';
import app from '../axiosConfig';

class SignOutButton extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		return (
			<button
				onClick={() =>
					app.get(url + '/user_management').then((res) => {
						console.log(res);
						if (res.status === 200) {
							console.log('i can pull the data');
							console.log(res);
						} else {
							console.log('nope');
						}
					})
				}
			>
				Temporary SignOut
			</button>
		);
	}
}

export default SignOutButton;
