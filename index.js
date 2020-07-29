/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
//import Header from './components/Header';
//import Dashboard from './views/Dashboard';
//import Cards from './components/Cards';
//import Footer from './components/Footer';
//import Headers_Top from './components/Headers_Top';
//import Blocks from './components/Blocks';
//import EnhancedTable from './components/EnhancedTable';
//import EnhancedTable from './components/EnhancedTable';
//import EnhancedTableToolbar from './components/EnhancedTableToolbar';
//import EnhancedTableHead from './components/EnhancedTableHead';
//import Header1 from './components/Header1';
//import Top from '/components/Top';

ReactDOM.render(
    <MuiThemeProvider theme={theme}> 
      <App/>
    </MuiThemeProvider>,
  document.getElementById('root')
);
/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)
 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );
*/
/*serviceWorker.unregister();*/
/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {createStore, applyMiddleware} from "redux";
import myReducer from "./redux_reducer/myReducer";
import reducer from './store/reducer';

const myStore = createStore(myReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
    //<MuiThemeProvider theme={theme}>
    <Provider store = {myStore}>
      <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider> 
    </Provider>,    
      
    //</MuiThemeProvider>,
  document.getElementById('root')
);

/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)
const simpleMiddleware = store => next =>action => {
  console.log('dispatching',action);
  const result = next(action);
  console.log('new state',store.getState());
  return result;
}
const store = createStore(reducer, applyMiddleware(simpleMiddleware));

 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );
*/
//serviceWorker.unregister();
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import theme from "../src/utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createStore } from "redux";
import allReducers from "./reducers";

const store = createStore(allReducers, {});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)
 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );
*/
serviceWorker.unregister();


