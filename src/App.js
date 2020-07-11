import React, {Component} from 'react';
import {increment, decrement, asyncIncrement} from './redux/actions.js';

class App extends Component {
  handleIncrement = () => {
    this.props.store.dispatch(increment(1));
  };
  handleDecrement = () => {
    this.props.store.dispatch(decrement(1));
  };

  handleAsyncIncrement = () => {
    setTimeout(() => {
      this.props.store.dispatch(increment(1));
    }, 2000);
    // this.props.store.dispatch(asyncIncrement(1));
  };

  render() {
    console.log(this.props.store.getState());
    const count = this.props.store.getState().count;
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

export default App;
