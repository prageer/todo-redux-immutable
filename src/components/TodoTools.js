import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as todoActions from '../modules/todo';


export class TodoTools extends React.Component {
  static propTypes = {
    filter: PropTypes.string,
    todoActions: PropTypes.object
  }

  render() {
    const {filter, todoActions} = this.props;
    return (
      <footer className="footer">
        <ul className="filters">
          <li>
            <a href="#"
              onClick={() => todoActions.setFilter('all')}
              className={filter === 'all' ? 'selected' : null}>
                All
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => todoActions.setFilter('active')}
              className={filter === 'active' ? 'selected' : null}>
                Active
            </a>
          </li>
          <li>
            <a href="#"
              onClick={() => todoActions.setFilter('completed')}
              className={filter === 'completed' ? 'selected' : null}>
                Completed
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default connect(
  (state) => ({
    filter: state.todo.get('filter')
  }),
  (dispatch) => ({
    todoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoTools);
