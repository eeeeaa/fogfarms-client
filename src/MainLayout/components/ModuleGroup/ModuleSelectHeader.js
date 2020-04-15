import React, { useContext } from 'react';
import { ModuleContext } from '../../contexts/ModuleContext';

const ModuleSelectHeader = () => {
	const { modules } = useContext(ModuleContext);
	return (
		<div className="ModuleSelectBox">
			<p>Module - Module Group xxx</p>
		</div>
	);
};

export default ModuleSelectHeader;
