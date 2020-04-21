import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ControllerDetail = ({ datas }) => {
	return (
		<li>
			<div className="controller">which do u controll</div>
			{/* use dispatch here to send the data */}
			<div className="button-switch">Toggle button</div>
		</li>
	);
};

export default ControllerDetail;
