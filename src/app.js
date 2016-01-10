import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store'

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}