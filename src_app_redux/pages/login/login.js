import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';

import './login.less';
/**
 * 登录路由
 **/
class Login extends Component {
  onFinish = async (values) => {
    const {username, password} = values;
    this.props.login(username, password);
  };
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    if (user && user.errMsg) {
      message.error(user.errMsg);
    }
  }

  render() {
    const user = this.props.user;
    if (user && user._id) {
      return <Redirect to='/home'></Redirect>;
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

export default connect(
  (state) => {
    return {user: state.user};
  },
  {login}
)(Login);
