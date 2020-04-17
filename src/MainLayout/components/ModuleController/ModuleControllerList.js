import React, { useContext } from 'react';
import { ControlledContext } from '../../contexts/ControlledContext';
import ControllerDetail from './ControllerDetail';

const ModuleControllerList = () => {
	const { controllers } = useContext(ControlledContext);
	return controllers.length ? (
		<div className="controller-list">
			<ul>
				{controllers.map((controller) => {
					return <ControllerDetail controller={controller} status={controller.status} key={controller.id} />;
				})}
			</ul>
		</div>
	) : (
		<div className="empty">there's no way right.</div>
	);
};

export default ModuleControllerList;
