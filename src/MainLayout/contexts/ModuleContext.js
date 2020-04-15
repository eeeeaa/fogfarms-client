import React, { createContext, useReducer, useEffect } from 'react';
import { moduleReducer } from '../reducers/ModuleReducer';

export const ModuleContext = createContext();

const ModuleContextProvider = (props) => {
	const [modules, dispatch] = useReducer(moduleReducer, [], () => {
		return { name: 'A', ownedBy: 'me' };
		// default DataCue, load from dave data as json.
	});
	return <ModuleContext.Provider value={{ modules, dispatch }}>{props.children}</ModuleContext.Provider>;
};

export default ModuleContextProvider;
