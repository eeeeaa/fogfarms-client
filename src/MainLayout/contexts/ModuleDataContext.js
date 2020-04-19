import React, { createContext, useState } from 'react';

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
	const [datas, setDatas] = useState([]);
	return <ModuleDataContext.Provider value={{datas}}>{props.children}</ModuleDataContext.Provider>;
};

export default ModuleDataContextProvider;
