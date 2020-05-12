import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '@pages/page';

const BasicRoute = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App}></Route>
    </Switch>
  </Router>
);

export default BasicRoute;
