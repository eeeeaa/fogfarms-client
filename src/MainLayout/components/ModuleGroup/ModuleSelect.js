import React, { useContext, useEffect } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';
import Module from './Module';


const ModuleSelect = () => {
	const { modules } = useContext(ModuleContext);
	return modules.length ? (
		<div className="module-list">
			<ul>
				{modules.map((module) => {
					return <Module module={module} key={module.id} />;
				})}
			</ul>
		</div>
	) : (
		<div className="no-module">No modules atm</div>
	);
};

export default ModuleSelect;
