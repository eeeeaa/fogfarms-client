import React, { useContext, useState, useEffect } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
// import app from '../../functions/axiosConfig';
import { Progress } from 'antd';

const ModuleDataGraph = () => {
	const { sensorModule, groupName } = useContext(ModuleDataContext);
	const [para, setPara] = useState('tds');
	const [history,SetHistory] = useState([])

	const infoHis = {	//fake data for the requesting the graph
		module_group_id: groupName,
		time_begin : "1999-04-21T03:00:00Z",
   		time_end: "2020-04-21T11:00:00Z"
	};
	  
	// For fetching History (The data is not very cool, atm)  
	// useEffect(() => {
	// 	loadDataHistory()
	// }, [para]);
	
	// const loadDataHistory = () => {
	// 	app.post("/dashboard/history", infoHis).then((res) => {
	// 	  const receivedData = res.data;
	// 	  const modulesJson = Object.keys(receivedData).map((key, i) => {
	// 		return { ...receivedData[key], name: key };
	// 	  });
	// 	});
	// };

	return (
		<div className="nutrientBox">
			<div className="nutrientTitle">
				<p>Nutrient 1</p>
			</div>
			<div>
				<Progress type="circle" percent={75} format={percent => `TDS ${percent}%`} />
				<Progress type="circle" percent={75} format={percent => `${percent} Days`} />
				<Progress type="circle" percent={100} format={() => `Days`} />
			</div>
		</div>
	);
};

export default ModuleDataGraph;