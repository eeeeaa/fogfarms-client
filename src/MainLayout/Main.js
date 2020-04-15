import Login from './Log_in';
import Dashboard from './Dashboard';
import MenuBar from './nav';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Main() {
	return (
		<Router>
			<MenuBar />
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
	);
}

export default Main;
