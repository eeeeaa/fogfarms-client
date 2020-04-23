import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const Module = ({ name }) => {
	return (
		<div className="moduleName">
			{name}
		</div>
	);
};

export default Module;
