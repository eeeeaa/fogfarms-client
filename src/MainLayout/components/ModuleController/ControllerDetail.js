import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import { Form } from 'react-bootstrap';

const ControllerDetail = ({ datas }) => {
	return (
		<li>
			<Form>
				<Form.Check
					type="switch"
					id="custom-switch"
					label= "This Button"/>
			</Form>
		</li>
	);
};

export default ControllerDetail;
