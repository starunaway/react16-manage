import {combineReducers} from 'redux';

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
      throw Error('Duplicate key' + key);
    }
    reducers[key] = initialReducerGroup(reducerGroup, onReducer);
  }

  return combineReducers(reducers);
}

export function initialReducerGroup(reducerGroup, onReducer) {}

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
