import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import Module from "./Module";
import ModuleSelectHeader from "./ModuleSelectHeader";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const ModuleSelect = () => {
  const { datas, setCurrentModule } = useContext(ModuleDataContext);
  return (
    <div className="containerBox">
      <ModuleSelectHeader />
      <List component="nav" className="listBox" aria-label="mailbox folders">
       <ListItem button
          onClick={() => {
            setCurrentModule("allmodule");
          }}
        >
          <div className="moduleName">All Modules</div>
        </ListItem>
        {datas.map((data, index) => {
          return (
            <>
              <Divider/>
              <ListItem button
                key={data.name || index}
                onClick={() => {
                  setCurrentModule(data.name);
                }}
              >
                <Module name={data.name} />
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );
};

export default ModuleSelect;
