import React from 'react';
import {connect} from 'react-redux';
import Action from '@action';
function App(props) {
  return (
    <div>
      <h5 style={{color: props.color}}>{props.num}</h5>
      <button onClick={() => Action.emit('num', {type: 'add', value: 10})}>
        add
      </button>
      <button onClick={() => Action.emit('num', {type: 'dec', value: 10})}>
        dec
      </button>
      <button onClick={() => Action.emit('color', 'red')}>red</button>
      <button onClick={() => Action.emit('color', 'blue')}>blue</button>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return {
    num: state.num,
    color: state.color
  };
}

export default connect(mapStateToProps)(App);
