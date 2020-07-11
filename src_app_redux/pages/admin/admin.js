import React, {Component} from 'react';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import {Layout} from 'antd';
import {Redirect, Switch, Route} from 'react-router-dom';
import Role from '../role/role';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import {connect} from 'react-redux';
const {Footer, Sider, Content} = Layout;

class Admin extends Component {
  render() {
    const user = this.props.user;
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
          <Content style={{backgroundColor: '#fff', margin: 20}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/role' component={Role} />
              <Route path='/category' component={Category} />
              <Route path='/user' component={User} />
              <Route path='/product' component={Product} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用Chrome浏览器,可以获得更好的体验</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => ({user: state.user}))(Admin);
