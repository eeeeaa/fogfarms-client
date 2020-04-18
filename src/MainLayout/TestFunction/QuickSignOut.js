import React, { Component } from 'react';
import app from '../axiosConfig';

class SignOutButton extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		return (
			<button
				onClick={() =>
					app.get(url + '/modulegroup_management').then((res) => {
						if (res.status === 200) {
							console.log('i can pull the data');
							console.log(res.data)
						} else {
							console.log('nope');
						}
					})
				}
			>
				Temporary callData
			</button>
		);
	}
}

export default SignOutButton;
