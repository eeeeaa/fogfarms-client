import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleControllerHeader = () => {
	const { datas } = useContext(ModuleDataContext);
	return (
		<div className="moduleControllerHeader">
			<p>Controller</p>
		</div>
	);
};

export default ModuleControllerHeader;
