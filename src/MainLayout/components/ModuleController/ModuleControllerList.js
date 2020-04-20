import React, { useContext } from 'react';
import ControllerDetail from './ControllerDetail';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleControllerList = () => {
	const { datas } = useContext(ModuleDataContext);
	return datas.length ? (
		<div className="controller-list">
			<ul>
				{datas.map((controller) => {
					return <ControllerDetail controller={controller} status={controller.status} key={controller.id} />;
				})}
			</ul>
		</div>
	) : (
		<div className="empty">there's no way right.</div>
	);
};

export default ModuleControllerList;
