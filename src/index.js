// import React from 'react';
// import ReactDOM from 'react-dom';
// import {createStore} from 'redux';
// import reducers from '@reducers';
// import {Provider} from 'react-redux';

// import Page from '@pages';

// let store = createStore(reducers);

// ReactDOM.render(
//   <Provider store={store}>
//     <Page />
//   </Provider>,
//   document.getElementById('root')
// );

import App from '@app';
import Action from '@action';
import routes from '@routes';
import models from '@models';

import {onEffect, onFetchOption} from '@utils/reduxUtils.js';

const app = new App({onEffect, onFetchOption});

app.models(models);
app.router(routes);

app.start('#root');

new Action({dispatch: app._store.dispatch, history: app._history});
