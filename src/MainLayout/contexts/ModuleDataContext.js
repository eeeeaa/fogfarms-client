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
	const info = {
		module_group_id: groupName //set which module group to pull data from
	}

	const fetchSetData = (url, groupID) => {
		app.post(url + '/dashboard', groupID).then((res) => {
			const recieveData = res.data;
			const modulesJson = Object.keys(recieveData).map((key, i) => {
				return { ...recieveData[key], "name":key};
			});
			setDatas(modulesJson);
		});
	}
	
	useEffect(() => {	//will use fetchSetData instead, have to change after modulegroupmng is done.
		app.post(url + '/dashboard', info).then((res) => {
			const recieveData = res.data;
			const modulesJson = Object.keys(recieveData).map((key, i) => {
				return { ...recieveData[key], "name":key};
			});
			setDatas(modulesJson);
		});
	}, []);

	const nonae = (module) => {
		return datas ? (
			console.log("there's data")
				) : (
			console.log("empty data"))
	}

	//setting controller and dashboard data
	useEffect(() => {
		if (currentModule==='allmodule'){
			console.log('pick all')
		}
		else{
			datas.map((key) => {
				if(key.name === currentModule) {
					setControllers(key.controller) //a little late when called log here
				}
			})
		}
		return () => {
			console.log('')
		}
	}, [currentModule])
	
	return <ModuleDataContext.Provider value={{ datas, currentModule, setCurrentModule, groupName }}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;