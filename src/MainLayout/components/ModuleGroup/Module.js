import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const Module = ({ name }) => {
	return (
		// fix here
		<li onClick={() => {console.log("Who are U : ", name)}}>
			<div className="moduleName">
				{name}
			</div>
		</li>
	);
};

export default Module;
