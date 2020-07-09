export const setHeadTitle = (title) => {
  console.log('setHeadTitle', title);
  return {
    type: 'setHeadTitle',
    data: title,
  };
};
