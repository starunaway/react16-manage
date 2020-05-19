import ajax from './ajax';

// const BASE_URL = 'http://192.168.198.133:5000';
const BASE_URL = '';

// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE_URL + '/manage/user/add', user, 'POST');
