import React, { createContext, useState, useEffect, useContext } from "react";
import app from "../functions/axiosConfig";
import { ModuleDataContext } from "./ModuleDataContext";

export const ModuleHistoryContext = createContext();

const ModuleHistoryContextProvider = (props) => {
  const [historyDatas, setHistoryDatas] = useState([]); //give every information
  const { datas, currentModule, moduleID } = useContext(ModuleDataContext); //use allmodule as a default

  const info = {
    //set which module group to pull data from
    module_group_id: 1,
    time_begin: "1999-04-21T03:00:00Z",
    time_end: "2020-04-30T11:00:00Z",
  };

  const loadHistory = () => {
    app.post("/dashboard/history", info).then((res) => {
      const receivedData = res.data;
      const modulesJson = Object.keys(receivedData).map((key, i) => {
        return { name: key, data: receivedData[key] };
      });
      setHistoryDatas(modulesJson);
    });
  };

  //calling the data upfront.
  useEffect(() => {
    // loadHistory();
  }, [datas]);

  return (
    <ModuleHistoryContext.Provider
      value={{
        historyDatas,
      }}
    >
      {props.children}
    </ModuleHistoryContext.Provider>
  );
};

export default ModuleHistoryContextProvider;
