import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ModuleParameterControl from "./ModuleParameterControl";
import ModuleControllerList from "./ModuleControllerList";

const ModuleControllerTabs = () => {
  const [currentTab, setCurrentTab] = useState("parameter");

  return (
    <Tabs activeKey={currentTab} onSelect={(k) => setCurrentTab(k)}>
      <Tab eventKey="parameter" title="Parameters">
        <ModuleParameterControl />
      </Tab>
      <Tab eventKey="controller" title="Equipment">
        <ModuleControllerList />
      </Tab>
    </Tabs>
  );
};

export default ModuleControllerTabs;
