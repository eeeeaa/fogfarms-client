import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleSelectHeader = () => {
	const {groupName } = useContext(ModuleDataContext);
	return (
		<div className="ModuleSelectBox">
			<p>Module Group {groupName}</p>
		</div>
	);
};

export default ModuleSelectHeader;
