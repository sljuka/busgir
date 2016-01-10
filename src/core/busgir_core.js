import {combineReducers} from 'redux'
import {todos} from './todos';
import {visibilityFilter} from './visibility_filter';

export const busgirApp = combineReducers({
  todos,
  visibilityFilter
});