import {combineReducers} from 'redux';
import isNil from 'lodash/isNil';
import has from 'lodash/has';

export function reducerBuilder(options, onReducer) {
  let reducers = {};
  let reducerGroups = new Map();
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      let reducer = options[key];
      if (reducer instanceof Array) {
        collectReducers(reducerGroups, reducer);
      } else {
        reducers[key] = reducer;
      }
    }
  }
  for (let [key, reducerGroup] of reducerGroups.entries()) {
    if (reducers.hasOwnProperty(key)) {
      throw Error('Duplicate key ' + key);
    }
    reducers[key] = initialReducerGroup(reducerGroup, onReducer);
  }
  return combineReducers(reducers);
}

export function initialReducerGroup(reducerGroup, onReducer) {
  const handlers = {};
  let initialState = {};
  for (let reducer of reducerGroup.values()) {
    if (!reducer.resultKey) {
      reducer.resultKey = 'result';
    }
    if (reducer.single) {
      initialState = reducer.initialState || {};
    } else {
      overrideState(initialState, reducer.subKeys, reducer.initialState);
    }

    let reducerAction = reducer.action;
    if (!reducerAction) {
      reducerAction = reducer.key;
    }
    handlers[reducerAction] = reducerHandler(
      reducer,
      'loading',
      (state, action) => {
        const {payload, ...other} = action;
        delete other.type;
        let newState = {
          [reducer.resultKey]: null,
          payload,
          success: false,
          loading: true,
          fromSocket: false,
          ...other
        };
        if (typeof onReducer === 'function') {
          newState = onReducer(newState, state, action, 'loading');
        }
        return newState;
      }
    );

    handlers[`${reducerAction}_SUCCESS`] = reducerHandler(
      reducer,
      'success',
      (state, action) => {
        const {done, fromSocket, result, payload, ...other} = action;
        delete other.type;
        let newState = {};
        if (fromSocket && done) {
          newState = result;
        } else {
          newState = {
            [reducer.resultKey]: result,
            payload,
            success: true,
            loading: false,
            fromSocket,
            ...other
          };
        }

        if (typeof onReducer === 'function') {
          newState = onReducer(newState, state, action, 'SUCCESS');
        }
        return newState;
      }
    );

    handlers[`${reducerAction}_FAIL`] = reducerHandler(
      reducer,
      'fail',
      (state, action) => {
        const {payload, error, ...other} = action;
        delete other.type;
        let newState = {
          payload,
          error,
          success: false,
          loading: false,
          fromSocket: false,
          ...other
        };
        if (typeof onReducer === 'function') {
          newState = onReducer(newState, state, action, 'fail');
        }
        return newState;
      }
    );
  }

  return createReducer(initialState, handlers);
}

function collectReducers(reducerGroups, reducers) {
  reducers.forEach((reducer) => {
    let keys = reducer.key.split('.');
    let [groupKey, ...subKeys] = keys;
    let group = reducerGroups.get(groupKey);
    if (!group) {
      group = new Map();
      reducerGroups.set(groupKey, group);
    }

    if (subKeys.length === 0) {
      reducer.single = true;
    } else {
      reducer.subKeys = subKeys;
    }

    if (group.has(reducer.key) && !reducer.single) {
      throw Error('Duplicate key' + reducer.key);
    }
    group.set(reducer.key, reducer);
  });
}

function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (isNil(action) || !has(action, 'type')) {
      return state;
    }

    const handler = handlers[action.type];
    let newState = isNil(handler) ? state : handler(state, action);
    if (!action.type.endsWith('FAIL')) {
      delete newState.error;
    }
    return newState;
  };
}

function overrideState(state, keys, value = {}) {
  let length = keys.length;
  if (length === 1) {
    return (state[keys[0]] = value);
  }

  let previous = state;
  for (let i = 0; i < length; ++i) {
    if (i === length - 1) {
      previous[keys[i]] = value;
    } else {
      let next = previous[keys[i]];
      if (!next) {
        next = previous[keys[i]] = {};
      }
      previous = next;
    }
  }
}

function reducerHandler(reducer, method, handler) {
  return (state, action) => {
    let result;
    if (reducer[method]) {
      result = reducer[method](state, action);
    } else {
      result = handler(state, action);
    }
    if (reducer.single) {
      state = result;
    } else {
      state = {...state};
      overrideState(state, reducer.subKeys, result);
    }
    return state;
  };
}
