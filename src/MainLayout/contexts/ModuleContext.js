import React, { createContext, useReducer, useEffect, useState } from 'react';
import { moduleReducer } from '../reducers/ModuleReducer';

export const ModuleContext = createContext();

const url = 'https://salty-oasis-24147.herokuapp.com';
const initial = [{name: 'hi'}];

const ModuleContextProvider = (props) => {
	const [modules, dispatch] = useReducer(moduleReducer, initial
	);
	return <ModuleContext.Provider value={{ modules, dispatch }}>{props.children}</ModuleContext.Provider>;
};

export default ModuleContextProvider;