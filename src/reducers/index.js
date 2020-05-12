import {combineReducers} from 'redux';
const tiger = 10000;
const defaultColor = 'black';

// 约定：state的key 和 reducer一致
const num = (state = tiger, action) => {
  switch (action.type) {
    case 'add':
      return state + action.value;
    case 'dec':
      return state - 100;
    default:
      return state;
  }
};

const color = (state = defaultColor, action) => {
  switch (action.type) {
    case 'red':
      return 'red';
    case 'blue':
      return 'blue';
    default:
      return state;
  }
};

const reducer = combineReducers({num, color});
export default reducer;
