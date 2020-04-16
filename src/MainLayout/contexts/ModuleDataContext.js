import React, { createContext, useReducer } from 'react';
import { moduleDataReducer } from '../reducers/ModuleDataReducer';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const [datas, dispatch] = useReducer(moduleDataReducer, []);
	return <ModuleDataContext.Provider value={{ datas, dispatch }}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;
