import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import {ChartsPage} from '../Carousel/GraphCarousel';

const ModuleDataGraph = () => {
	const { sensorModule } = useContext(ModuleDataContext);
	const [currentGraph,SetGraph] = useState('tds')
	return (
		<div className="graph-data">
			<ChartsPage/>
		</div>
	);
};

export default ModuleDataGraph;