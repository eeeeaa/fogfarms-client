import React, { createContext, useReducer, useEffect } from 'react';
import { moduleDataReducer } from '../reducers/ModuleDataReducer';
import app from '../functions/axiosConfig';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const url = 'https://salty-oasis-24147.herokuapp.com';
	const [datas, setDatas] = useReducer(moduleDataReducer, []);
	useEffect(() => {
		app.get(url + '/dashboard').then((res) => {
			const data = res.data;
			console.log('ModuleDataContext : ', data);
			const modulesJson = Object.keys(data).map((key, i) => {
				return { ...data[key] };
			});
			setDatas(modulesJson);
		});
	}, []);
	return <ModuleDataContext.Provider value={{ datas }}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;
