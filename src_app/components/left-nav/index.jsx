import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import memoryUtils from '../../utils/memoryUtils';

const {SubMenu} = Menu;

class LeftNav extends Component {
  // constructor 这里是可以直接拿到url属性的

  hasAuth = (item) => {
    const {key, isPublic} = item;

    const menus = ((memoryUtils.user || {}).role || {}).menus;

    const username = (memoryUtils.user || {}).username;
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限
     */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }

    return false;
  };
  getOpenKeys = (item) => {
    const {pathname} = this.props.location;
    const cItem = item.children.find((child) => child.key === pathname);
    if (cItem) {
      this.openKey = item.key;
    }
  };

  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
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
    let {pathname} = this.props.location;
    if (pathname.indexOf('/product') === 0) {
      pathname = '/product';
    }
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
