import axios from 'axios';
import {message} from 'antd';
/*
	异步ajax请求模块
	重新封装axios
	返回 Promise 对象

*/

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise;

    promise = axios({
      method,
      url,
      data,
      headers: {
        'content-type': 'application/json',
      },
    });

    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        message.error('请求出错' + err.message);
      });
  });
}
