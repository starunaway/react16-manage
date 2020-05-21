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
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>后台管理系统</h1>
        </Link>
        <Menu mode='inline' theme='dark' inlineCollapsed={this.state.collapsed}>
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
            <Menu.Item key='2' icon={<BarsOutlined />}>
              品类管理
            </Menu.Item>
            <Menu.Item key='3' icon={<CodeSandboxOutlined />}>
              商品管理
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='4' icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key='5' icon={<BellOutlined />}>
            角色管理
          </Menu.Item>

          <SubMenu key='sub2' icon={<PieChartOutlined />} title='图形图表'>
            <Menu.Item key='6' icon={<MailOutlined />}>
              品类管理
            </Menu.Item>
            <Menu.Item key='7' icon={<MailOutlined />}>
              商品管理
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
