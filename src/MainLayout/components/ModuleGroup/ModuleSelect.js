import React, { useContext, useEffect } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';
import Module from './Module';
import app from '../../axiosConfig';

const ModuleSelect = () => {
	const { modules } = useContext(ModuleContext);
	const url = 'https://salty-oasis-24147.herokuapp.com';
	useEffect( async ()=> {
		console.log('useEffct hook on moduleSelect');
		const result = await app.get(url + '/modulegroup_select');
		console.log(result.data);
		console.log(result.data.modulegroup1);


	}, [])
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
