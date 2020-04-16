import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import ModuleDataDetail from './ModuleDataDetail';

const ModuleDataGrowUnit = () => {
	const { datas } = useContext(ModuleDataContext);
	return datas.length ? (
		<div className="grow-list">
			<ul>
				{datas.map((data) => {
					return <ModuleDataDetail data={data} />;
				})}
			</ul>
		</div>
	) : (
		<div className="empty">there's no way right.</div>
	);
};

export default ModuleDataGrowUnit;
