import React, { createContext, useState, useEffect } from "react";
import app from "../functions/axiosConfig";

export const ModuleDataContext = createContext();

const ModuleDataContextProvider = (props) => {
  const [groupName, setGroupName] = useState(); //not a string, the group id must be a number.
  const [datas, setDatas] = useState([]); //give every information
  const [currentModule, setCurrentModule] = useState("allmodule"); //use allmodule as a default
  var x;
  const info = {
    //set which module group to pull data from
    module_group_id: groupName,
  };

  //calling the data upfront.
  useEffect(() => {
    console.log(x);
    loadData();
  }, [groupName]);

  const loadData = () => {
    app.post("/dashboard", info).then((res) => {
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
        setGroupName,
        loadData,
        sensorModule: datas.find((key) => key.name === currentModule)
          ?.sensor_module,
        controller: datas.find((key) => key.name === currentModule)?.controller,
        nutrient_amount: datas.find((key) => key.name === currentModule)
          ?.nutrient_amount,
        timestamp: datas.find((key) => key.name === currentModule)
          ?.sensor_module.timestamp,
        moduleID: datas.find((key) => key.name === currentModule)?.sensor_module
          .module_id,
      }}
    >
      {props.children}
    </ModuleDataContext.Provider>
  );
};

export default ModuleDataContextProvider;
