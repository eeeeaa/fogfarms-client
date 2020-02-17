import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './css_sheet/index.css';
//import ThemeSwitcher from './MainLayout/ThemeSwitcher';
import Login from './MainLayout/Log_in';
import * as serviceWorker from './serviceWorker';
//var element = React.createElement('h1',{className: 'Greeting'}, 'Sup,Bitches!')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

ReactDOM.render(<Login />, document.getElementById('root'));
serviceWorker.unregister();
