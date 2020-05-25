import React, {Component} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import LinkButton from '../link-button';

import {reqWeather} from '../../api';
import {Modal} from 'antd';
import menuList from '../../config/menuConfig';
import './index.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/duoyun.png',
      weather: '晴',
    };

    this.getCurrentTime();
    this.getWeather();
  }

  componentDidMount() {}

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getCurrentTime = () => {
    this.timer = setInterval(() => {
      this.setState({currentTime: moment().format('YYYY-MM-DD HH:mm:ss')});
    }, 1000);
  };

  getWeather = async () => {
    const result = await reqWeather('上海');
    const {dayPictureUrl, weather} = result;
    this.setState({dayPictureUrl, weather});
  };

  getTitle = (props) => {
    const {pathname} = props.location;
    let title;
    menuList.forEach((item) => {
      if (item.key === pathname) {
        title = item.title;
      } else if (item.children) {
        let cItem = item.children.find((child) => child.key === pathname);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace('/login');
      },
    });
  };

  render() {
    const {username} = memoryUtils.user;

    const title = this.getTitle(this.props);
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎,{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{this.state.currentTime}</span>
            <img src={this.state.dayPictureUrl} alt='weather' />
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
