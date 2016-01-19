import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo} from '../../features/todos/actions';
import TodoList from './todo_list';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

const mapStateToProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.getIn(['todos', 'todos']).toJS(),
      state.getIn(['todos', 'filter'])
    )
  };
};

const mapDispatchToProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList
