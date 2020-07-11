import {reqLogin} from '../api';
import storageUtils from '../utils/storageUtils';

export const setHeadTitle = (title) => {
  return {
    type: 'setHeadTitle',
    data: title,
  };
};

// 接受用户的同步action
export const receiveUser = (user) => {
  return {
    type: 'receiveUser',
    user,
  };
};

// 显示错误信息的同步action
export const showErrorMessage = (errMsg) => {
  return {
    type: 'showErrMsg',
    errMsg,
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      const user = result.data;
      storageUtils.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      const msg = result.msg;
      dispatch(showErrorMessage(msg));
    }
  };
};

export const logout = () => {
  return {
    type: 'resetUser',
  };
};
