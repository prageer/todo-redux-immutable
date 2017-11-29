import {createAction, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';
import axios from 'axios';
import { List, Map } from 'immutable';

function getUserAPI() {
  return axios.get('https://jsonplaceholder.typicode.com/users');
}

// action type
const LOAD = 'todo/LOAD';
const SET_FILTER = 'todo/SET_FILTER';
const TOGGLE_STATUS = 'todo/TOGGLE_STATUS';
const DELETE_ITEM = 'todo/DELETE_ITEM';

// action creators
export const load = createAction(LOAD, getUserAPI);
export const setFilter = createAction(SET_FILTER);
export const toggleStatus = createAction(TOGGLE_STATUS);
export const deleteItem = createAction(DELETE_ITEM);

// initial states
const initialState = Map({
  todos: List.of(),
  filter: 'all'
});

// reducers
export default handleActions({
  ...pender({
    type: LOAD,
    onSuccess: (state, action) => {
      const rows = action.payload.data;
      let mapObjs = rows.map((item)=>{
        return Map({ id: item.id, text: item.name, status: 'active'});
      });
      return state.set('todos', List(mapObjs));
    }
  }),
  [SET_FILTER]: (state, action) => {
    return state.set('filter', action.payload);
  },
  [TOGGLE_STATUS]: (state, action) => {
    const itemIndex = state.get('todos').findIndex(item => (
      item.get('id') === action.payload
    ));
    return state.updateIn(
      ['todos', itemIndex, 'status'], status => (
        status === 'active' ? 'completed' : 'active'
    ));
  },
  [DELETE_ITEM]: (state, action) => {
    return state.update('todos', todos => (
      todos.filterNot(item => (
        item.get('id') === action.payload
      ))
    ));
  }
}, initialState);
