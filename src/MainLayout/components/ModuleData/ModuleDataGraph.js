import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import { Row, Col } from 'react-bootstrap';
import {GraphCarousel} from '../Carousel/GraphCarousel';

const ModuleDataGraph = () => {
	const { sensorModule } = useContext(ModuleDataContext);
	const [currentGraph,SetGraph] = useState('tds')
	return (
		<div className="graph-data">
			<Row>
				<GraphCarousel/>
			</Row>
			<div className="graphing"> graph</div>
		</div>
	);
};

export default ModuleDataGraph;