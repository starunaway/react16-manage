import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';

import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,

  document.getElementById('root')
);
