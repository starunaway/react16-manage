import * as effects from 'redux-saga/effects';
import {fork, takeEvery} from 'redux-saga/effects';
import fetch from './fetch';
import {parseTwoDigitYear} from 'moment';

export function sagaBuilder(options, args) {
  const sagaArr = [];
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      let value = options[key];
      if (value instanceof Array) {
        for (let item of value) {
          if (item.url) {
            sagaArr.push(createSaga(item, args));
          }
        }
      } else {
        sagaArr.push(value);
      }
    }
  }

  return function*() {
    for (let saga of sagaArr) {
      yield fork(saga);
    }
  };
}

export function createSaga(item, {onEffect, onFetchOption, history}) {
  const action = item.action || item.key;
  return function*() {
    let take = item.takeEvery || takeEvery;
    yield take(action, function*(actions) {
      let response;
      const effect = item.effect || getEffect(item);
      let putAction = {
        type: action,
        payload: actions.payload
      };

      try {
        let type = item.type || 'json';
        let bodyParser = item.body || bodyHandler;
        let option = createOptions(
          item.method,
          type,
          item.headers,
          bodyParser(actions.payload, type, item.method)
        );
        if (typeof onFetchOption === 'function') {
          option = onFetchOption(option, item);
        }
        response = yield effect(actions, {fetch, option}, {...effects}, item);
      } catch (error) {
        putAction.success = false;
        putAction.loading = false;
        putAction.result = null;
        putAction.message = error || 'error';
        putAction.type = `${putAction.type}_FAIL`;
        yield effects.put(putAction);
      }

      if (response) {
        if (typeof onEffect === 'function') {
          putAction.url = item.url(actions.payload);
          putAction = yield onEffect(putAction, response, effects, history);
        } else {
          putAction.loading = false;
          putAction.success = response.status === 200;
          putAction.status = response.status;
          putAction.result = yield response.json();
        }
        putAction.type = `${putAction.type}${
          putAction.success ? '_SUCCESS' : '_FAIL'
        }`;
        yield effects.put(putAction);
      }
    });
  };
}

function bodyHandler(data, type, method) {
  if (method !== 'get' && data) {
    if (type === 'json') {
      return JSON.stringify(data);
    } else if (type === 'form') {
      let pairs = [];
      for (let key of data) {
        pairs.push(key + '=' + data[key]);
      }
      return pairs.join('&');
    }
  }
  if (method === 'get') {
    return '';
  }
  return data;
}

function getEffect(item) {
  return function* baseEffect({payload}, {fetchData, option}) {
    return yield fetchData(item.url(payload), option);
  };
}

function createOptions(method, type, extHeaders, payload) {
  let options = {method};
  options.header = extHeaders || {
    Accept: 'application/json',
    'Content-Type':
      type === 'json' ? 'application/json' : 'application/x-www-form-urlencoded'
  };

  if (method !== 'get') {
    options.body = payload;
  }

  return options;
}
