import React from 'react';
import '../css_sheet/global_theme.css';
import ModuleSelect from './components/ModuleGroup/ModuleSelect';
import ModuleContextProvider from './contexts/ModuleContext';
import ModuleSelectHeader from './components/ModuleGroup/ModuleSelectHeader';
import ControlledContextProvider from './contexts/ControlledContext';
import ModuleControllerHeader from './components/ModuleController/ModuleControllerHeader';
import ModuleControllerList from './components/ModuleController/ModuleControllerList';
import ModuleDataContextProvider from './contexts/ModuleDataContext';
import ModuleDataGraph from './components/ModuleData/ModuleDataGraph';
import ModuleDataGrowUnit from './components/ModuleData/ModuleDataGrowUnit';
import SignInButton from './TestFunction/QuickSignIn';
import APICheck from './TestFunction/QuickAPICheck';
import SignOutButton from './TestFunction/QuickSignOut';

function Dashboard() {
	return (
		<div className="dashBoard">
			<SignInButton />
			<APICheck />
			<SignOutButton/>
			<ModuleContextProvider>
				<ModuleSelectHeader />
				<ModuleSelect />
			</ModuleContextProvider>
			<ModuleDataContextProvider>
				<ModuleDataGraph />
				<ModuleDataGrowUnit />
			</ModuleDataContextProvider>
			<ControlledContextProvider>
				<ModuleControllerHeader />
				<ModuleControllerList />
			</ControlledContextProvider>
		</div>
	);
}

export default Dashboard;
