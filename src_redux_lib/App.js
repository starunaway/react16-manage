import React, {Component} from 'react';
import {connect} from './lib/react-redux';

import {increment, decrement} from './redux/actions.js';

class App extends Component {
  handleIncrement = () => {
    this.props.increment(1);
  };
  handleDecrement = () => {
    this.props.decrement(1);
  };

  handleAsyncIncrement = () => {
    setTimeout(() => {
      this.props.increment(1);
    }, 2000);
    // this.props.store.dispatch(asyncIncrement(1));
  };

  render() {
    const count = this.props.count;
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

const mapStateToProps = (state) => ({count: state.count});
const mapDispatchToProps1 = {increment, decrement};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps1)(App);
