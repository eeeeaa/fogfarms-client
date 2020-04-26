import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import Module from "./Module";
import ModuleSelectHeader from "./ModuleSelectHeader";
import { Button } from "react-bootstrap";

const ModuleSelect = () => {
  const { datas, setCurrentModule } = useContext(ModuleDataContext);
  return (
    <div className="moduleSelect">
      <ModuleSelectHeader />
      <div className="module-list">
        <ul>
          <Button
            onClick={() => {
              setCurrentModule("allmodule");
            }}
          >
            <div className="moduleName">All Modules</div>
          </Button>
          {datas.map((data, index) => {
            return (
              <Button
                key={data.name || index}
                onClick={() => {
                  setCurrentModule(data.name);
                }}
              >
                <Module name={data.name} />
              </Button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ModuleSelect;
