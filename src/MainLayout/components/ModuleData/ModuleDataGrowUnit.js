import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import ModuleDataDetail from "./ModuleDataDetail";

const ModuleDataGrowUnit = () => {
  const { datas } = useContext(ModuleDataContext);
  return (
    <div className="grow-list">
      <ul>
        {datas.map((data, index) => {
          return <ModuleDataDetail key={index} data={data} />;
        })}
      </ul>
    </div>
  );
};

export default ModuleDataGrowUnit;
