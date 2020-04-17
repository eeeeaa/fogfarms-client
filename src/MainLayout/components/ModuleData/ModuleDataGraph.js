import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleDataGraph = () => {
	const { datas } = useContext(ModuleDataContext);
	return (
		<div className="graph-data">
			<div className="graph-TDS">2 ppm</div>
			<div className="graph-pH">5.4</div>
			<div className="graph-SolTemp">34 C</div>
			<div className="graphing">graph here</div>
		</div>
	);
};

export default ModuleDataGraph;
