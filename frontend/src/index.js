import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = createStore(reducers,composePlugin(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
