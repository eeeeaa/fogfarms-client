import './css_sheet/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './css_sheet/index.css';
import Login from './MainLayout/Log_in'
import Main from './MainLayout/Main';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
class App extends React.Component{
    render (){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/main" component={Main} />
                </Switch>
            </Router>
        )
            
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
  