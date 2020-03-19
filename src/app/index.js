import React from 'react';
import ReactDOM from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';
import {reducerBuilder} from './reducerBuilder';
import {sagaBuilder} from './sagaBuilder';
import {Base64} from 'js-base64';
import 'react-redux';

const cSagaMiddleware = createSagaMiddleware.default || createSagaMiddleware;

function App(opts ={}) {

  const {onEffect, onFetchOption, onReducer} = opts;
  const history = createBrowserHistory();

  const app = {
    _models: [],
    model,
    models,
    reducerMiddleware,
    start: startWithContainer,
    router
  };

  return app;

  function model(model) {
    app._models.push(model);
  }

  function models(models) {
    app._models = [...app._models, ...models];
  }

  function reducerMiddleware(middleware) {
    app._reducerMiddleware = middleware;
  }

  function start(app) {
    const sagaMiddleware = cSagaMiddleware();
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
      initialState,
      sagaMiddleware
    });

    app._store = store;
    store.runSaga = sagaMiddleware.run;
    const sagas = sagaBuilder(app._models, {onEffect, onFetchOption, history});
    sagaMiddleware.run(sagas);
    app._history = patchHistory(history);
  }

  function startWithContainer(container) {
    debugger
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!app._store) {
      start(app);
    }

    const store = app._store;

    if (container) {
      render(container, store, app);
    } else {
      return getProvider(store, this);
    }
  }

  function router(router) {
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
