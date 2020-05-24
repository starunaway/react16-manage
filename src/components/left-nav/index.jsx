import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';

const {SubMenu} = Menu;

class LeftNav extends Component {
  // constructor 这里是可以直接拿到url属性的

  getOpenKeys = (item) => {
    const {pathname} = this.props.location;
    const cItem = item.children.find((child) => child.key === pathname);
    if (cItem) {
      this.openKey = item.key;
    }
  };

  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        this.getOpenKeys(item);

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
        this.getOpenKeys(item);

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    const {pathname} = this.props.location;
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>后台管理系统</h1>
        </Link>
        <Menu mode='inline' theme='dark' selectedKeys={[pathname]} defaultOpenKeys={[this.openKey]}>
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
