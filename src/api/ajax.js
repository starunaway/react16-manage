import axios from 'axios';

/*
	异步ajax请求模块
	重新封装axios
	返回 Promise 对象

*/

export default function ajax(url, data = {}, method = 'GET') {
  if (method === 'GET') {
    return axios.get(url, {
      params: data,
    });
  } else {
    return axios.post(url, data);
  }
}
