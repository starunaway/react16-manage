import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import moment from 'moment';
import {PAGE_SIZE} from '../../utils/constants';
import AddForm from './add-form';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [], // 所有角色的列表
      role: {}, // 选中的role
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
    };
  }
  render() {
    return <div className='header'>Role</div>;
  }
}

export default Role;
