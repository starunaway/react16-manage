import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';
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
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        pre.push(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes_Map(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  getMenuNodes_Map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>后台管理系统</h1>
        </Link>
        <Menu mode='inline' theme='dark'>
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
