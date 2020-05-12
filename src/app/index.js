import React from 'react';
import ReactDOM from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import invariant from 'invariant';
import createStore from './createStore';
import {reducerBuilder} from './reducerBuilder';
import {Base64} from 'js-base64';
import {createBrowserHistory} from 'history';
import {isFunction, isHTMLElement, isString} from './utils';

function App(opts = {}) {
  const {onReducer} = opts;
  const history = opts.history || createBrowserHistory();

  const app = {
    _models: [],
    model,
    models,
    start,
    router
  };
  app._history = patchHistory(history);

  return app;
  function model(model) {
    app._models.push(model);
  }

  function models(models) {
    app._models = [...app._models, ...models];
  }

  function oldAppStart(app) {
    let initialState = {};
    if (window.__INITIAL_STATE__) {
      try {
        initialState =
          JSON.parse(Base64.decode(window.__INITIAL_STATE__)) || {};
      } catch (e) {
        console.error('parse window initial state error -> ', e);
      }
    }
    const store = createStore({
      reducers: reducerBuilder(app._models, onReducer),
      initialState
    });
    app._store = store;
  }

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
