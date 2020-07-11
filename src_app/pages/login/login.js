import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom';

import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqLogin} from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './login.less';
/**
 * 登录路由
 **/
class Login extends Component {
  onFinish = async (values) => {
    const {username, password} = values;
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      message.success('登录成功');
      const user = result.data;

      //   保存到内存中
      memoryUtils.user = user;
      //   保存到本地
      storageUtils.saveUser(user);

      this.props.history.replace('/');
    } else {
      message.error(result.msg);
    }
  };

  render() {
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to='/'></Redirect>;
    }
    return (
      <div className='login'>
        <header className='login-header'>后台管理系统</header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form name='normal_login' className='login-form' onFinish={this.onFinish}>
            <Form.Item name='username' rules={[{required: true, message: 'Please input your Username!'}]}>
              <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {required: true, message: 'Please input your Password!'},
                {min: 4, message: '最少4位'},
                {max: 8, message: '最多8位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '密码格式不对'},
              ]}
            >
              <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
