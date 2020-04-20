import React, { Component } from 'react';
import app from '../functions/axiosConfig';

class APICheck extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		return (
			<button
				onClick={() =>
					app.get(url + '/modulegroup_management').then((res) => {
						if (res.status === 200) {
							console.log(JSON.stringify(res.data));
						} else {
							console.log('Query Data: Failed');
						}
					})
				}
			>
				Temporary callData
			</button>
		);
	}
}

export default APICheck;
