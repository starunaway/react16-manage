import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
import store from './redux/store';
import App from './App';

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,

  document.getElementById('root')
);
