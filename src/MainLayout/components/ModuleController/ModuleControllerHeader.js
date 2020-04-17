import React, { useContext } from 'react';
import { ControlledContext } from '../../contexts/ControlledContext';

const ModuleControllerHeader = () => {
	const { controllers } = useContext(ControlledContext);
	return (
		<div className="moduleControllerHeader">
			<p>Controller</p>
		</div>
	);
};

export default ModuleControllerHeader;
