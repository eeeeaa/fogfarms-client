import React, { useContext } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';
import Module from './Module';

const ModuleSelect = () => {
	const { modules } = useContext(ModuleContext);
	console.log('Modules Group: ', modules);
	return modules.length ? (
		<div className="module-list">
			<ul>
				{modules.map((module) => {
					return <Module module={module} key={module.module_group_id} />;
				})}
			</ul>
		</div>
	) : (
		<div className="no-module">No modules atm</div>
	);
};

export default ModuleSelect;
