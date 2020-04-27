import React, { useState } from "react";
import { Tabs } from "antd";
import ModuleParameterControl from "./ModuleParameterControl";
import ModuleControllerList from "./ModuleControllerList";

const ModuleControllerTabs = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Parameter" key="1">
        <ModuleParameterControl />
      </TabPane>
      <TabPane tab="Controller" key="2">
        <ModuleControllerList />
      </TabPane>
    </Tabs>
  );
};

export default ModuleControllerTabs;
