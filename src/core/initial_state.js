import {fromJS} from 'immutable'

export const initialState = fromJS({
  todos: {
    filter: 'SHOW_ALL',
    todos: []
  },
  processes: {}
})
