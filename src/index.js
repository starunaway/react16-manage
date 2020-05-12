import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducers from '@reducers';
import {Provider} from 'react-redux';

import Page from '@pages';

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
);
