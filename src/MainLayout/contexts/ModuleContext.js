import React, { createContext, useReducer, useEffect } from 'react';
import { moduleReducer } from '../reducers/ModuleReducer';

export const ModuleContext = createContext();

const ModuleContextProvider = (props) => {
	const [modules, dispatch] = useReducer(
		moduleReducer,
		[
			{ name: 'A', ownedBy: 'me' },
			{ name: 'B', ownedBy: 'not me' },
		]
		// , () => {
		//for local storage and cookie
		// 	// default DataCue, load from dave data as json.
		// }
	);
	return <ModuleContext.Provider value={{ modules, dispatch }}>{props.children}</ModuleContext.Provider>;
};

export default ModuleContextProvider;
