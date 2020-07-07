export const increment = (number) => {
  return {
    type: 'INCREMENT',
    data: number,
  };
};

export const decrement = (number) => {
  return {
    type: 'DECREMENT',
    data: number,
  };
};
