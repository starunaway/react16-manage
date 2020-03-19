import React from 'react';
// import createHistory from 'history/createBrowserHistory';
import '@themes';
import Action from '@action';
import App from '@app';
import models from '@models';
import {onEffect, onFetchOption} from '@utils/reduxUtils';

import routes from '@routes';

const app = new App({
  onEffect,
  onFetchOption,
  // history: createHistory()
});

app.model(models);
app.router((a) => {
  return routes(a);
});

app.start('#root');
//

// import str from '@pages';
new Action({dispatch: app._store.dispatch, history: app._history});
