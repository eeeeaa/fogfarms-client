import React, { createContext, useState, useEffect } from 'react';
import app from '../functions/axiosConfig';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const url = 'https://salty-oasis-24147.herokuapp.com';
	const [groupName, setGroupName] = useState(1) //not a string, the group id must be a number.
	const [datas, setDatas] = useState([]); //give every information
	const [currentModule, setCurrentModule] = useState('allmodule'); //
	const [controllers, setController] = useState(); //include only controller in that module
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
	
	const SetController = (module) => {
		return datas ? (
			console.log("there's data")
				) : (
			console.log("empty data"))
	}


	useEffect(() => {
		console.log("current Module is making a change")
		return () => {
			console.log("perform cleanUP ??")
		}
	}, [currentModule])
	
	return <ModuleDataContext.Provider value={{ datas, currentModule, setCurrentModule, groupName }}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;