import ajax from './ajax';

const BASE_URL = 'http://localhost:5000';

// 登录
export const reqLogin = (username, password) => ajax(`${BASE_URL}/login`, {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(`${BASE_URL}/manage/user/add`, user, 'POST');
