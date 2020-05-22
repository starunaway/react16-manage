import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import {Link} from 'react-router-dom';
import {Menu, Button} from 'antd';
import {
  UserOutlined,
  BellOutlined,
  CodeSandboxOutlined,
  BarsOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class LeftNav extends Component {
  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>后台管理系统</h1>
        </Link>
        <Menu mode='inline' theme='dark'>
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
            <Menu.Item key='2' icon={<BarsOutlined />}>
              <Link to='/category'>品类管理</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<CodeSandboxOutlined />}>
              <Link to='/product'>商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='4' icon={<UserOutlined />}>
            <Link to='/user'>用户管理</Link>
          </Menu.Item>
          <Menu.Item key='5' icon={<BellOutlined />}>
            <Link to='/role'>角色管理</Link>
          </Menu.Item>

          <SubMenu key='sub2' icon={<PieChartOutlined />} title='图形图表'>
            <Menu.Item key='6' icon={<MailOutlined />}>
              <Link to='/charts/bar'>柱状图</Link>
            </Menu.Item>
            <Menu.Item key='7' icon={<MailOutlined />}>
              <Link to='/charts/line'>线型图</Link>
            </Menu.Item>
            <Menu.Item key='8' icon={<MailOutlined />}>
              <Link to='/charts/pie'>饼图</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
