import React, { useContext } from 'react';
import ControllerDetail from './ControllerDetail';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import { controllers } from 'chart.js';

const ModuleControllerList = () => {
	const { datas } = useContext(ModuleDataContext);
	const module1 = datas[0];
	console.log("equipments Check : ", module1)
	return datas.length ? (
		<div className="controller-list">
			<ul>
				{datas.map((data) => {
					return <ControllerDetail data={data} status={data.status} key={data.id} />;
				})}
			</ul>
		</div>
	) : (
		<div className="empty">there's no way right.</div>
	);
};

export default ModuleControllerList;
