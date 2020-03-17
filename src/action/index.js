import init from '@utils/instance';

const __action = init();
class  Action {
  constructor({dispatch,history}) {
    const instance = __action();
    if (instance) return instance;
    this._dispatch = dispatch;
    this._history = history;
    __action(this);
  }

  static


}

export default  Action