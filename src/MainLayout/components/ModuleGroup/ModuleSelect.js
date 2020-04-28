import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import Module from "./Module";
import ModuleSelectHeader from "./ModuleSelectHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";

const ModuleSelect = () => {
  let history = useHistory();
  const { datas, setCurrentModule } = useContext(ModuleDataContext);
  return (
    <div className="containerBox" style={{ color: "white" }}>
      <ModuleSelectHeader />
      <List component="nav" className="listBox" aria-label="mailbox folders">
        {datas.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem
                button
                key={data.name || index}
                onClick={() => {
                  setCurrentModule(data.name);
                }}
              >
                <Module name={data.name} key={index} />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
        <ListItem>-------- </ListItem>
        <Divider />
        <ListItem
          button
          key={"allmodule"}
          onClick={() => {
            setCurrentModule("allmodule");
            history.push("/dashboard");
          }}
        >
          <div className="moduleName">View Data</div>
        </ListItem>
        <Divider />
        <ListItem
          button
          key={"viewHistory"}
          onClick={() => {
            setCurrentModule("viewHistory");
            history.push("/dashboard_history");
          }}
        >
          <div className="moduleName">View History</div>
        </ListItem>
      </List>
    </div>
  );
};

export default ModuleSelect;
