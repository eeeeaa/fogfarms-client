import React, { createContext, useReducer } from 'react';
import { moduleControllerReducer } from '../reducers/ModuleControllerReducer';

export const ControlledContext = createContext();

const ControlledContextProvider = (props) => {
	const [controllers, dispatch] = useReducer(moduleControllerReducer, [
		//add mock value here
		//add cookie will be implement on the third parameter here.
	]);
	// useEffect
	return <ControlledContext.Provider value={{ controllers, dispatch }}>{props.children}</ControlledContext.Provider>;
};

export default ControlledContextProvider;
