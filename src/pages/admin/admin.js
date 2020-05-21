import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import {Layout} from 'antd';
const {Footer, Sider, Content} = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      // 当前没有登录
      return <Redirect to='/login'></Redirect>;
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor: '#fff'}}>Content</Content>
          <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用Chrome浏览器,可以获得更好的体验</Footer>
        </Layout>
      </Layout>
    );
  }
}
