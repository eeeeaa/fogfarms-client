import React, { useContext } from 'react';
import { ControlledContext } from '../../contexts/ControlledContext';

const ControllerDetail = ({ controllers }) => {
	const { dispatch } = useContext(ControlledContext);
	return (
		<li>
			<div className="controller">which do u controll</div>
			{/* use dispatch here to send the data */}
			<div className="button-switch">Toggle button</div>
		</li>
	);
};

export default ControllerDetail;
