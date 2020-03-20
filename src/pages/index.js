import React from 'react';
import {BrowserRouter as Router, Switch, Redirect,Link,Route} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import AddGoods from '@pages/addGoods';
import AddShop from '@pages/addShop';
import AdminList from '@pages/adminList';
import AdminSet from '@pages/adminSet';
import FoodList from '@pages/foodList';
import Main from '@pages/main';
import OrderList from '@pages/orderList';
import ShopList from '@pages/shopList';
import UserList from '@pages/userList';
import Visitor from '@pages/visitor';
const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;
function App() {
  return (
    <div className='App'>
      <Layout>
        <Router>
          <Sider>
            <Menu
              mode='inline'
              theme='dark'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
            >
              <SubMenu key='首页' title={<span>首页</span>}>
                <Menu.Item key='main'>
                  <Link to='/main'>main</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key='数据管理' title={<span>数据管理</span>}>
                <Menu.Item key='userList'>
                  <Link to='/userList'>userList</Link>
                </Menu.Item>
                <Menu.Item key='shopList'>
                  <Link to='/shopList'>shopList</Link>
                </Menu.Item>
                <Menu.Item key='foodList'>
                  <Link to='/foodList'>foodList</Link>{' '}
                </Menu.Item>
                <Menu.Item key='orderList'>
                  <Link to='/orderList'>orderList</Link>{' '}
                </Menu.Item>
                <Menu.Item key='adminList'>
                  <Link to='/adminList'>adminList</Link>{' '}
                </Menu.Item>
              </SubMenu>

              <SubMenu key='添加数据' title={<span>添加数据</span>}>
                <Menu.Item key='addShop'>
                  <Link to='/addShop'>addShop</Link>
                </Menu.Item>
                <Menu.Item key='addGoods'>
                  <Link to='/addGoods'>addGoods</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key='图表' title={<span>图表</span>}>
                <Menu.Item key='visitor'>
                  <Link to='/visitor'>visitor</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='设置' title={<span>设置</span>}>
                <Menu.Item key='adminSet'>
                  <Link to='/adminSet'>adminSet</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Content>
            <Route exact path={`/`} component={Main} />
            <Route exact path={`/main`} component={Main} />
            <Route exact path={`/addGoods`} component={AddGoods} />
            <Route exact path={`/addShop`} component={AddShop} />
            <Route exact path={`/adminList`} component={AdminList} />
            <Route exact path={`/adminSet`} component={AdminSet} />
            <Route exact path={`/foodList`} component={FoodList} />
            <Route exact path={`/orderList`} component={OrderList} />
            <Route exact path={`/shopList`} component={ShopList} />
            <Route exact path={`/userList`} component={UserList} />
            <Route exact path={`/visitor`} component={Visitor} />
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App();
