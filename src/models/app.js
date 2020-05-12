export default [
  {
    key: 'num',
    initialState: 5,
    loading: (state, action) => {
      console.log('num', state, action);
      if (action.payload.type === 'add') {
        return state + action.payload.value;
      } else {
        return state - action.payload.value;
      }
      return 2;
    }
  },
  {
    key: 'color',
    initialState: 'black',
    loading: (state, action) => {
      console.log('color', state, action);

      return action.payload;
    }
  }
];
