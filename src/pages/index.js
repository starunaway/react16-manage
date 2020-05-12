import React from 'react';
import {connect} from 'react-redux';
function App(props) {
  return (
    <div>
      <h5 style={{color: props.color}}>{props.num}</h5>
      <button onClick={props.PayIncrease(10)}>add</button>
      <button onClick={props.PayDecrease}>dec</button>
      <button onClick={props.setRed}>red</button>
      <button onClick={props.setBlue}>blue</button>
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

function mapDispatchToProps(dispatch) {
  return {
    PayIncrease: (value) => () => dispatch({type: 'add', value: value}),
    PayDecrease: () => dispatch({type: 'dec'}),
    setRed: () => dispatch({type: 'red'}),
    setBlue: () => dispatch({type: 'blue'})
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
