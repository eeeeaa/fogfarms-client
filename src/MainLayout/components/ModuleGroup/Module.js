import React, { useContext } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';

const Module = ({ module }) => {
	const { dispatch } = useContext(ModuleContext);
	return (
		<li>
			<div className="moduleName" onClick={() => console.log('u click at '+ module.module_group_id)}>Module {module.module_group_id}</div>
		</li>
	);
};

export default Module;