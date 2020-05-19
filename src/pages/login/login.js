import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqLogin} from '../../api';
import './login.less';
/**
 * 登录路由
 **/
class Login extends Component {
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const {username, password} = values;
    reqLogin(username, password)
      .then((response) => {
        console.log('login success', response);
      })
      .catch((err) => console.log('login失败', err));
  };

  render() {
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
