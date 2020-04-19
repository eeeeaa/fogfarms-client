import React, { Component } from 'react';
import app from '../axiosConfig';

class APICheck extends Component {
	render() {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		return (
			<button
				onClick={() =>
					app.get(url + '/modulegroup_management').then((res) => {
						if (res.status === 200) {
							console.log('i can pull the data');
							console.log(typeof res.data)
							console.log(JSON.stringify(res.data))
							console.log(typeof JSON.stringify(res.data))
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

export default APICheck;
