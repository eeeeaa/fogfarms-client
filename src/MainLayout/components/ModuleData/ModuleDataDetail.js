import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleDataDetail = ({  }) => {
	const {datas } = useContext(ModuleDataContext);
	console.log(datas[0])
	return (
		<li>
			<div className="grow-name">{datas.sensor_module}</div>
		</li>
	);
};
export default ModuleDataDetail;