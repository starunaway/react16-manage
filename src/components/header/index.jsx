import React, {Component} from 'react';
import './index.less';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎,{}</span>
          <a href='javascript'>退出</a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>首页</div>
          <div className='header-bottom-right'>
            <span>23点20分</span>
            <img src='' alt='weather' />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
