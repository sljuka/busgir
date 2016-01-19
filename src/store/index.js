import {busgirApp} from '../core/busgir_core';
import {createStore} from 'redux';
import {initialState} from '../core/initial_state'

export default function makeStore(userInitialState = null) {
  return createStore(busgirApp, userInitialState || initialState);
};
