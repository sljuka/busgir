import {combineReducers} from 'redux-immutablejs';
import {processes} from '../features/processes/core';
import {todos} from '../features/todos/core';

export const busgirApp = combineReducers({
  todos,
  processes
});