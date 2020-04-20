import React, { Component } from 'react';
import app from '../functions/axiosConfig';
import { useHistory } from 'react-router-dom';

const SignoutButton = () => {
	let history = useHistory();
	const url = 'https://salty-oasis-24147.herokuapp.com';
	return (
		<button
			onClick={() =>
				app.get(url + '/auth/sign_out').then((res) => {
					if (res.status === 200) {
						console.log('Auth: Signing Out');
						history.push('/');
					}
				})
			}
		>
			{' '}
			SignOut Button
		</button>
	);
};

export default SignoutButton;
