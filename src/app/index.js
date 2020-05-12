import React from 'react';
import ReactDOM from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import invariant from 'invariant';
import {createBrowserHistory} from 'history';
import {isFunction, isHTMLElement, isString} from './utils';
import create from './redux/core';

function App(opts = {}) {
  const {onEffect, onFetchOption, onReducer} = opts;
  const history = opts.history || createBrowserHistory();
  const createOpts = {
    setupApp(app) {
      app._history = patchHistory(history);
    },
    onEffect,
    onFetchOption,
    onReducer,
    history
  };

  const app = create(createOpts);
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function start(container) {
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, `[app.start] container ${container} not found`);
    }
    invariant(
      !container || isHTMLElement(container),
      `[app.start] container should be HTMLElement`
    );
    invariant(
      app._router,
      `[app.router] router must be registered before app.start()`
    );

    if (!app._store) {
      oldAppStart(app);
    }

    const store = app._store;

    if (container) {
      render(container, store, app);
    } else {
      return getProvider(store, this);
    }
  }

  function router(router) {
    invariant(
      isFunction(router),
      `[app.router] router should be function, but got ${typeof router}`
    );
    app._router = router;
  }
}

function getProvider(store, app) {
  return <Provider store={store}>{app._router(app, Routers)}</Provider>;
}

function render(container, store, app) {
  ReactDOM.render(getProvider(store, app), container);
}

function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = (callback) => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
}

export default App;
