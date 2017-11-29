import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as todoActions from '../modules/todo';
import TodoItem from './TodoItem';

export class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.object,
    filter: PropTypes.string,
    loading: PropTypes.bool,
    todoActions: PropTypes.object
  }

  componentWillMount() {
    const {todoActions} = this.props;
    todoActions.load();
  }

  filterItems() {
    const {todos, filter} = this.props;
    if (todos) {
      return todos.filter(item => (
        filter === 'all' || item.get('status') === filter
      ));
    } else {
      return [];
    }
  }
  render() {
    const {loading} = this.props;
    const {todoActions} = this.props;
    return (
      <div>
        {
          loading && <h2>Loading...</h2>
        }
        <ul className="todo-list">
          {this.filterItems().map(item => (
            <TodoItem key={item.get('text')}
              id={item.get('id')}
              text={item.get('text')}
              status={item.get('status')}
              toggleStatus={todoActions.toggleStatus}
              deleteItem={todoActions.deleteItem} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    todos: state.todo.get('todos'),
    filter: state.todo.get('filter'),
    loading: state.pender.pending['todo/LOAD']
  }),
  (dispatch) => ({
    todoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoList);
