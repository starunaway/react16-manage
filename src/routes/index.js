import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AddGoods from '@pages/addGoods';
import App from '@pages';

import AddShop from '@pages/addShop';

const BasicRoute = () => (
  <Router>
    <div>
      <Link to='/'>Home</Link>
      <Link to='/addShop'>AddShop</Link>
      <Link to='/addGoods'>Home</Link>
    </div>

    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route exact path='/addShop' component={AddShop}></Route>
      <Route exact path='/addGoods' component={AddGoods}></Route>
    </Switch>
  </Router>
);

export default BasicRoute;
