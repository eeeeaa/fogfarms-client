import React, { useContext } from 'react';
import { ModuleContext } from '../contexts/ModuleContext';

const ModuleSelect = () => {
	const { modules } = useContext(ModuleContext);
	return modules.length ? (
		<div className="module-list">
			<ul>
				{modules.map((module) => {
					return <h1>hi</h1>;
				})}
			</ul>
		</div>
	) : (
		<div className="no-module">No modules atm</div>
	);
};

export default ModuleSelect;
