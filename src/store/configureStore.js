import {createStore, applyMiddleware} from 'redux';
import reducer from '../modules';
import createSagaMiddleware from 'redux-saga';
import penderMiddleware from 'redux-pender';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store =
    createStore(reducer, applyMiddleware(sagaMiddleware, penderMiddleware()));
  return store;
};
export default configureStore;
