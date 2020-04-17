import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleDataDetail = ({ datas }) => {
	const { dispatch } = useContext(ModuleDataContext);
	return (
		<li>
			<div className="grow-name">grow x</div>
			<div className="grow-temp">34 C Temperature</div>
			<div className="grow-humidity">21% humidity</div>
		</li>
	);
};
export default ModuleDataDetail;
