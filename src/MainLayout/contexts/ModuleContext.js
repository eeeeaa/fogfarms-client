import React, { createContext, useEffect, useState } from "react";
import app from "../functions/axiosConfig";

export const ModuleContext = createContext();

const ModuleContextProvider = (props) => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    loading();
  }, []);

  const loading = () => {
    app.get("/modulegroup_management").then((res) => {
      const data = res.data;
      const modulesJson = Object.keys(data).map((key, i) => {
        return { ...data[key], name: key };
      });
      setModules(modulesJson);
    });
  };
  return (
    <ModuleContext.Provider
      value={{
        modules,
      }}
    >
      {props.children}
    </ModuleContext.Provider>
  );
};

export default ModuleContextProvider;
