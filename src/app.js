import React, { Component } from 'react';
import {Provider} from 'react-redux';
import makeStore from './store'

export class App extends Component {

  constructor(props) {
    super(props);
    this.store = makeStore()
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onDocumentKeypress.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onDocumentKeypress.bind(this))
  }

  onDocumentKeypress(e) {
    // Press shift+ctrl+s to save app state and shift+ctrl+l to load.
    // TODO Fix in Firefox
    if (!e.shiftKey || !e.ctrlKey) return
    switch (e.keyCode) {
      case 19:
        console.info(this.store.getState().toJS())
        break
    }
  }
}