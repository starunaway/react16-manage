import {combineReducers} from 'redux';
import storageUtils from '../utils/storageUtils';

function headTitle(state = '', action) {
  switch (action.type) {
    case 'setHeadTitle':
      return action.data;
    default:
      return state;
  }
}

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
  switch (action.type) {
    case 'receiveUser':
      return action.user;
    case 'showErrMsg':
      return {
        ...state,
        errMsg: action.errMsg,
      };
    case 'resetUser':
      storageUtils.removeUser();
      return {};
    default:
      return state;
  }
}

export default combineReducers({user, headTitle});
