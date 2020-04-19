import React, { createContext, useReducer, useEffect, useState } from 'react';
import { moduleReducer } from '../reducers/ModuleReducer';
import app from '../axiosConfig';

export const ModuleContext = createContext();

const ModuleContextProvider = (props) => {
	const [modules, setModules] = useState([]);

	useEffect(async ()=> {
		const url = 'https://salty-oasis-24147.herokuapp.com';
		const result = await app.get(url + '/modulegroup_management');
		const data = result.data;
		console.log(result.data.modulegroup1.on_auto);
		const modulesJson = Object.keys(result.data).map((key,i) => {
			return {...data[key]};
		})
		console.log(modulesJson);
		console.log("module_group_id : " + modulesJson[0].module_group_id);
		setModules(modulesJson);
	}, [])
	return <ModuleContext.Provider value={{modules}}>{props.children}</ModuleContext.Provider>;
};

export default ModuleContextProvider;