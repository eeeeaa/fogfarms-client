import React from "react";
import ModuleDataGraph from "./ModuleDataGraph";
import ModuleDataGrowUnit from "./ModuleDataGrowUnit";

const ModuleDataDetail = () => {
  return (
    <div className="dataBox" style={{ color: "white" }}>
      <ModuleDataGraph />
      <ModuleDataGrowUnit />
    </div>
  );
};
export default ModuleDataDetail;
