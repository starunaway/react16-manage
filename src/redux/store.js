import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import mySagas from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(mySagas);
export default createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
