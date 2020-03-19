export const onEffect = async (action, res) => {
  try {
    const body = await res.json();
    action.status = body.status;
    action.loading = false;
  } catch (e) {
    action.success = false;
    action.loading = false;
  }
  return action;
};

export const onFetchOption = (option, item) => {
  return option;
};
