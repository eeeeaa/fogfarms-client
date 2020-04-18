import Login from './Log_in';
import Dashboard from './Dashboard';
import MenuBar from './nav';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Management_select from './Manage_Select';

function Main() {
	return (
		<Router>
			<MenuBar />
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/management_select" component={Management_select} />
			</Switch>
		</Router>
	);
}

export default Main;
