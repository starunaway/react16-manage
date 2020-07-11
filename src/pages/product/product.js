import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ProductHome from './home';
import ProductDetail from './detail';
import ProductAddUpdate from './add-update';

class Product extends Component {
  render() {
    //   Router 路由判断路径的时候，会判断当前path是什么，根据path判断渲染哪个组件
    //  组件也可以继续使用router判断下一级路由应该渲染什么组件，但是不能写父组件对应的路由，死循环
    return (
      <Switch>
        <Route exact path='/product' component={ProductHome}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Redirect to='/product'></Redirect>
      </Switch>
    );
  }
}

export default Product;
