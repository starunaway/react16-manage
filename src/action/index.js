import init from '@utils/instance';

const __action = init();
class Action {
  constructor({dispatch, history}) {
    const instance = __action();
    if (instance) return instance;
    this._dispatch = dispatch;
    this._history = history;
    __action(this);
  }

  static emit = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action().dispatch({type, payload});
    });
  };

  static success = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({type: `${type}_SUCCESS`, ...payload});
    });
  };
}

export default Action;
