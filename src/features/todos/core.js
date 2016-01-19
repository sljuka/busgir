import {initialState} from '../../core/initial_state'
import {Map, List} from 'immutable'

const todosInitialState = initialState.get('todos')

export const todos = (todosState = todosInitialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return addTodo(todosState, action)
    case 'TOGGLE_TODO':
      return toggleTodo(todosState, action)
    case 'SET_FILTER':
      return todosState.set('filter', action.filter)
    default:
      return todosState
  }
}

function addTodo(todosState, action) {
  const {text} = action

  return todosState.update(todos => {
    const id = todos.get('idCounter') || 0

    return todos
      .set('idCounter', id + 1)
      .update('todos', List(), (todos) =>
        todos.unshift(Map({
          text,
          id
        }))
      )
  })
}

function toggleTodo(todosState, action) {
  const {id} = action

  return todosState.update('todos', List(), todos =>
    todos.map((todo) => {
      if (todo.get('id') === id) {
        const completed = todo.get('completed')
        return todo.set('completed', !completed)
      }

      return todo
    })
  )
}
