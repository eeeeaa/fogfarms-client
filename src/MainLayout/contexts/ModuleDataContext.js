import React, { createContext, useState, useEffect } from 'react';
import app from '../functions/axiosConfig';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const url = 'https://salty-oasis-24147.herokuapp.com';
	const [groupName, setGroupName] = useState(1) //not a string, the group id must be a number.
	const [datas, setDatas] = useState([]); //give every information
	const [currentModule, setCurrentModule] = useState('allmodule'); //use allmodule as a default
	const [information, setInformation] = useState([])
	const [controllers, setControllers] = useState([]); //include only controller in that module
	const [solenoid_valves, setSolenoid_valves] = useState([]); //include only controller in that module
	const info = {
		module_group_id: groupName //set which module group to pull data from
	}

	// const fetchPost = (parameter, groupID) => {
	// 	app.post(url + parameter, groupID).then((res) => {
	// 		const recieveData = res.data;
	// 		const modulesJson = Object.keys(recieveData).map((key, i) => {
	// 			return { ...recieveData[key], "name":key};
	// 		});
	// 		console.log(modulesJson)
	// 		setDatas(modulesJson);
	// 	});
	// }
	
	//calling the data upfront.
	useEffect(() => {
		app.post(url + '/dashboard', info).then((res) => {
			const recieveData = res.data;
			const modulesJson = Object.keys(recieveData).map((key, i) => {
				return { ...recieveData[key], "name":key};
			});
			setDatas(modulesJson);
		});
	}, []);

	//setting controller and dashboard data
	useEffect(() => {
		if (currentModule==='allmodule'){
			console.log('pick all') //clear the state, then use ...state, {add sth}
		}
		else{
			datas.map((key) => {
				if(key.name === currentModule) {
					setSolenoid_valves(controllers.solenoid_valve)
				}
			})
		}
		return () => {
			datas.map((key) => {
				if(key.name === currentModule) {
					setControllers(key.controller)
				}
			})
		}
	}, [currentModule])
	
	return <ModuleDataContext.Provider value={{ datas, currentModule, setCurrentModule, groupName, controllers, solenoid_valves}}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;