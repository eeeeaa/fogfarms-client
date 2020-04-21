import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleDataDetail = ({  }) => {
	const {datas } = useContext(ModuleDataContext);
	return (
		<li>
			<div className="grow-name">{datas.sensor_module}</div>
		</li>
	);
};
export default ModuleDataDetail;