import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd';

// const BASE_URL = 'http://192.168.198.133:5000';
const BASE_URL = '';

// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE_URL + '/manage/user/add', user, 'POST');

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/weather/telematics/v3/weather?location=${city}&ak=PUfsHehUYcLKztECaMZj96l6HGhKUx8N`;
    jsonp(url, {}, (err, data) => {
      console.log('jsonp', err, data);
      if (!err && data.status === 'success') {
        const {dayPictureUrl, weather} = data.result[0].weather_data[0];
        resolve({dayPictureUrl, weather});
      } else {
        message.error('获取天气信息失败');
      }
    });
  });
};

reqWeather('上海');
