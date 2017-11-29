import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import todo from './todo';

export default combineReducers({
  todo,
  pender: penderReducer
});
