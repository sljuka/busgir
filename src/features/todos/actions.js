export const addTodo = (text) => ({
  type: 'ADD_TODO',
  text
})

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
