import React from 'react';
import '../css_sheet/global_theme.css';
import ModuleSelect from './components/ModuleSelect';
import ModuleContextProvider from './contexts/ModuleContext';

function Dashboard() {
	return (
		<div className="dashBoard">
			<ModuleContextProvider className="ModuleSelectBox">
				<h1>Module - Module Group xxx</h1>
				<ModuleSelect />
			</ModuleContextProvider>
		</div>
	);
}

export default Dashboard;
