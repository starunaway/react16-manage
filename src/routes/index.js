import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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

export default (app) => {
  return (
    <Router history={app._history}>
      <Switch>
        <Route
          path='/'
          component={(props) => (
            <div>
              <Route path='/main' exact component={Main} />
              <Route path='/addGoods' exact component={AddGoods} />
              <Route path='/addShop' exact component={AddShop} />
              <Route path='/adminList' exact component={AdminList} />
              <Route path='/adminSet' exact component={AdminSet} />
              <Route path='/foodList' exact component={FoodList} />
              <Route path='/orderList' exact component={OrderList} />
              <Route path='/shopList' exact component={ShopList} />
              <Route path='/userList' exact component={UserList} />
              <Route path='/visitor' exact component={Visitor} />
            </div>
          )}
        />
      </Switch>
    </Router>
  );
};
