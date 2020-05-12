import React, {Component} from 'react';
import {Button, message} from 'antd';
export default class App extends Component {
  handleClick = () => {
    message.success('click');
  };
  render() {
    return (
      <Button type='primary' onClick={this.handleClick}>
        hellpo
      </Button>
    );
  }
}
