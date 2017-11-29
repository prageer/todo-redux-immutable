import React from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
    toggleStatus: PropTypes.func,
    deleteItem: PropTypes.func
  }

  render() {
    const {status, text, id } = this.props;
    const {toggleStatus, deleteItem } = this.props;

    let completedClassName = status === 'completed' ? 'completed' : null;
    return (
      <li className={`todo ${completedClassName}`}>
        <div className="view">
          <input type="checkbox"
            className="toggle"
            defaultChecked={status === 'completed'}
            onClick={() => toggleStatus(id)} />
          <label htmlFor="todo">
            {text}
          </label>
          <button
            className="destroy"
            onClick={() => deleteItem(id)}>
          </button>
        </div>
      </li>
    );
  }
}
