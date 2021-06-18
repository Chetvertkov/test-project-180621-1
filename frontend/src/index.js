import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App';

import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import thunk from "redux-thunk";
import {rootReducer} from "./redux/rootReducer";

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__?
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(): compose
));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
  ,
  document.getElementById('root')
);


