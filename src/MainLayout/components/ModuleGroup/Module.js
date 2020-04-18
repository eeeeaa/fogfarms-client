import React, { useContext } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';

const Module = ({ module }) => {
	const { dispatch } = useContext(ModuleContext);
	return (
		<li>
			<div className="moduleName">{module.name}</div>
		</li>
	);
};

export default Module;