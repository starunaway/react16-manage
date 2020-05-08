import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '@reducers';
import App from '@pages';
import Router from '@routes';
import '@themes';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>,
  document.getElementById('root')
);
