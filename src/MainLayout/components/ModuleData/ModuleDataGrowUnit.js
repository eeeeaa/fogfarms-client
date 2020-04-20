import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import ModuleDataDetail from './ModuleDataDetail';

const ModuleDataGrowUnit = () => {
	const { datas } = useContext(ModuleDataContext);
	console.log("Data Check : ",datas)
	return (
		<div className="grow-list">
			<ul>
				{datas.map((data) => {
					return <ModuleDataDetail data={data} />;
				})}
			</ul>
		</div>
	)
};

export default ModuleDataGrowUnit;
