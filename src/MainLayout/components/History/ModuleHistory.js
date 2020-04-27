import React, { useContext } from "react";
import { ModuleHistoryContext } from "../../contexts/ModuleHistoryContext";

const ModuleHistory = () => {
  const { historyDatas, historyArray } = useContext(ModuleHistoryContext);
  console.log("History Datas : ", historyDatas);
  console.log("History Array : ", historyArray);
  return (
    <div className="dataBox">
      <p>hi</p>
    </div>
  );
};
export default ModuleHistory;
