import React, { createContext, useState, useEffect } from "react";
import app from "../functions/axiosConfig";

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
  const url = "https://salty-oasis-24147.herokuapp.com";
  const [groupName, setGroupName] = useState(1); //not a string, the group id must be a number.
  const [datas, setDatas] = useState([]); //give every information
  const [currentModule, setCurrentModule] = useState("allmodule"); //use allmodule as a default
  const [information, setInformation] = useState([]);

  const info = {
    module_group_id: groupName, //set which module group to pull data from
  };

  // const fetchPost = (parameter, groupID) => {
  // 	app.post(url + parameter, groupID).then((res) => {
  // 		const recieveData = res.data;
  // 		const modulesJson = Object.keys(recieveData).map((key, i) => {
  // 			return { ...recieveData[key], "name":key};
  // 		});
  // 		console.log(modulesJson)
  // 		setDatas(modulesJson);
  // 	});
  // }

  //calling the data upfront.
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    app.post(url + "/dashboard", info).then((res) => {
      const receivedData = res.data;
      const modulesJson = Object.keys(receivedData).map((key, i) => {
        return { ...receivedData[key], name: key };
      });
      setDatas(modulesJson);
    });
  };

  return (
    <ModuleDataContext.Provider
      value={{
        datas,
        currentModule,
        setCurrentModule,
        groupName,
        loadData,
        sensorModule: datas.find((key) => key.name === currentModule)
          ?.sensor_module,
        controller: datas.find((key) => key.name === currentModule)?.controller,
      }}
    >
      {props.children}
    </ModuleDataContext.Provider>
  );
};

export default ModuleDataContextProvider;
