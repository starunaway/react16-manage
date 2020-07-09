import {combineReducers} from 'redux';
import storageUtils from '../utils/storageUtils';

function headTitle(state = '首页', action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({user, headTitle});
