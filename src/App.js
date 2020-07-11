import React, {Component} from 'react';
import {connect} from 'react-redux';
import {increment, decrement, asyncIncrement} from './redux/actions.js';

class App extends Component {
  handleIncrement = () => {
    this.props.increment(1);
  };
  handleDecrement = () => {
    this.props.decrement(1);
  };

  handleAsyncIncrement = () => {
    this.props.asyncIncrement(1);
  };

  render() {
    const {count} = this.props;
    return (
      <div>
        <span>value is: {count}</span>
        <button onClick={this.handleIncrement}> +1 </button>
        <button onClick={this.handleDecrement}> -1 </button>
        <button onClick={this.handleAsyncIncrement}> +1 after 2s </button>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      count: state,
    };
  },
  {increment, decrement, asyncIncrement}
)(App);
