import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import AddGoods from '@pages/addGoods';
import App from '@pages';

import AddShop from '@pages/addShop';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route exact path='/addShop' component={AddShop}></Route>
      <Route exact path='/addGoods' component={AddGoods}></Route>
    </Switch>
  </HashRouter>
);

export default BasicRoute;
