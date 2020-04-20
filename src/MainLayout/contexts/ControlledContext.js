import React, { createContext, useReducer, useEffect } from 'react';
import { moduleControllerReducer } from '../reducers/ModuleControllerReducer';

export const ControlledContext = createContext();

const ControlledContextProvider = (props) => {
	const [controllers, dispatch] = useReducer(moduleControllerReducer, []);
	useEffect(() => {
		console.log('Controlled Context use effect');
	});
	return <ControlledContext.Provider value={{ controllers, dispatch }}>{props.children}</ControlledContext.Provider>;
};

export default ControlledContextProvider;
