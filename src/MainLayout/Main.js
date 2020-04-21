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