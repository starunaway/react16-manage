import {takeEvery, put} from 'redux-saga/effects';

function* mySaga() {
  yield takeEvery('ACTION_TYPE', getList);
}

function* getList() {}

export default mySaga;
