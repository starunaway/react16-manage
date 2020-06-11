import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd';

// const BASE_URL = 'http://192.168.198.133:5000';
const BASE_URL = '';

// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE_URL + '/manage/user/add', user, 'POST');

// 请求天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // 如果成功了
      if (!err && data.status === 'success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0];
        resolve({dayPictureUrl, weather});
      } else {
        // 如果失败了
        message.error('获取天气信息失败!');
      }
    });
  });
};

// 请求一二级分类列表
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', {parentId}, 'GET');

// 添加分类
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE_URL + '/manage/category/add', {categoryName, parentId}, 'POST');

//   更新分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(BASE_URL + '/manage/category/update', {categoryId, categoryName}, 'POST');

// 获取商品分页
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {pageNum, pageSize});
/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) =>
  ajax(BASE_URL + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) =>
  ajax(BASE_URL + '/manage/product/updateStatus', {productId, status}, 'POST');

// 获取一个商品分类
export const reqCategory = (categoryId) => ajax(BASE_URL + '/manage/category/info', {categoryId});

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) =>
  ajax(BASE_URL + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE_URL + '/manage/img/delete', {name}, 'POST');

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE_URL + '/manage/role/list');
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE_URL + '/manage/role/add', {roleName}, 'POST');
// 添加角色
export const reqUpdateRole = (role) => ajax(BASE_URL + '/manage/role/update', role, 'POST');
