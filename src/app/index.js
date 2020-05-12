import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import invariant from 'invariant';
import createStore from './createStore';
import {reducerBuilder} from './reducerBuilder';
import {Base64} from 'js-base64';
import {createBrowserHistory} from 'history';
import {isFunction, isHTMLElement, isString} from './utils';

class App {
  constructor(props = {}) {
    this._history = this.patchHistory(props.history || createBrowserHistory());
    this._models = [];
    this._router = null;
    this._store = null;
    this._props = props;
  }

  useModel(model) {
    this._models.push(model);
  }

  useModels(models) {
    this._models = [...this._models, ...models];
  }

  useRouter(router) {
    invariant(
      isFunction(router),
      `[app.router] router should be function, but got ${typeof router}`
    );
    this._router = router;
  }

  start(container) {
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, `[app.start] container ${container} not found`);
    }
    invariant(
      !container || isHTMLElement(container),
      `[app.start] container should be HTMLElement`
    );
    invariant(
      this._router,
      `[app.router] router must be registered before app.start()`
    );

    if (!this._store) {
      let initialState = {};
      if (window.__INITIAL_STATE__) {
        try {
          initialState =
            JSON.parse(Base64.decode(window.__INITIAL_STATE__)) || {};
        } catch (e) {
          console.error('parse window initial state error -> ', e);
        }
      }
      this._store = createStore({
        reducers: reducerBuilder(this._models, this._props.onReducer),
        initialState
      });
    }

    ReactDOM.render(
      <Provider store={this._store}>{this._router(this)}</Provider>,
      container
    );
  }

  patchHistory = (history) => {
    const oldListen = history.listen;
    history.listen = (callback) => {
      callback(history.location);
      return oldListen.call(history, callback);
    };
    return history;
  };
}

export default App;
