import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      // 当前没有登录
      return <Redirect to='/login'></Redirect>;
    }
    return <div>Hello, {user.username}</div>;
  }
}
