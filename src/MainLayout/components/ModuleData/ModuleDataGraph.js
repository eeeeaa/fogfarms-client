import React, { useContext } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import { Row, Col } from 'react-bootstrap';

const ModuleDataGraph = () => {
	const { datas } = useContext(ModuleDataContext);
	console.log("Datas Check : ",datas)
	console.log("Datas Check array: ",datas[0])
	return (
		<div className="graph-data">
			<Row>
				<Col>{datas.sensor_module}</Col>
				<Col>ph 5.4</Col>
				<Col>sol temp: 34 C</Col>
			</Row>
			<div className="graphing"> graph</div>
		</div>
	);
};

export default ModuleDataGraph;