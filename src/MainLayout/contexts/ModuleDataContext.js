import React, { createContext, useState, useEffect } from 'react';
import app from '../functions/axiosConfig';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const url = 'https://salty-oasis-24147.herokuapp.com';
	const [datas, setDatas] = useState([]);
	const info = {
		module_group_id: 1 //(work) need to match with teh module management.
	}
	useEffect(() => {
		app.post(url + '/dashboard', info).then((res) => {
			const info = res.data;
			const modulesJson = Object.keys(info).map((key, i) => {
				return { ...info[key]};
			});
			setDatas(modulesJson);
		});
	}, []);
	return <ModuleDataContext.Provider value={{ datas }}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;
