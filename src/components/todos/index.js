import React from 'react';
import AddTodo from './add_todo';
import TodoFooter from './todo_footer';
import VisibleTodoList from './visible_todo_list';

const TodoPage = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <TodoFooter />
  </div>
);

export default TodoPage
