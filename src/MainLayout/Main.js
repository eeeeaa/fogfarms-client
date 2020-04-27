<<<<<<< HEAD
import Login from './Log_in'
import Dashboard from './Dashboard';
import MenuBar from './menu_bar';
import management_select from './Manage_Select';
import ManModule from './Manage_Module';
import ManUser from './Manage_User';
import ManPlant from './Manage_Plant';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
class MainLayout extends React.Component{
    render () {
        return (
           <div>
                <Router>
                <MenuBar />
                    <Switch>
                        <Route path='/dash' exact component={Dashboard}/>
                        <Route path='/manage-select' component={management_select}/>
                        <Route path='/manage-module' component={ManModule}/>
                        <Route path='/manage-user' component={ManUser}/>
                        <Route path='/manage-plant' component={ManPlant}/>
                    </Switch>
                </Router>
           </div>
        );
    }
}

export default MainLayout;
=======
import Login from "./pages/Log_in";
import Dashboard from "./pages/Dashboard";
import DashboardHistory from "./pages/DashboardHistory";
import MenuBar from "./nav";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Management_select from "./pages/Manage_Select";
import Manage_user from "./pages/Manage_User";
import Manage_module from "./pages/Manage_Module";
import Manage_plant from "./pages/Manage_plant";
import ModuleDataContextProvider from "./contexts/ModuleDataContext";

const Menu = () => {
  return (
    <Router>
      <ModuleDataContextProvider>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard_history" component={DashboardHistory} />
          <Route path="/manage-select" component={Management_select} />
          <Route path="/manage-module" component={Manage_module} />
          <Route path="/manage-user" component={Manage_user} />
          <Route path="/manage-plant" component={Manage_plant} />
        </Switch>
      </ModuleDataContextProvider>
    </Router>
  );
};

export default Menu;
>>>>>>> bossPush
