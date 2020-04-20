import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import ModuleParameterControl from './ModuleParameterControl';
import ModuleControllerList from './ModuleControllerList';

const ModuleControllerTabs = () => {
    return ( 
        <Tabs>
            <Tab eventKey="parameter" title="Parameters">
                <ModuleParameterControl/>
            </Tab>
            <Tab eventKey="controller" title="Equipment">
                <ModuleControllerList/>
            </Tab>
        </Tabs>
     );
}
 
export default ModuleControllerTabs;
