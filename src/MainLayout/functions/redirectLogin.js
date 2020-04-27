import React, { useState } from 'react';
import app from './axiosConfig';

function redirectLogin() {
	const [isLogin, setIsLogin] = useState(false);
	const url = 'https://salty-oasis-24147.herokuapp.com/modulegroup_management';
	app.get(url).then((res) => {
		if (res.status === 200) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	});
	return isLogin ? true : false;
}

export default redirectLogin;
