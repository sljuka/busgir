import createBrowserHistory from 'history/lib/createBrowserHistory';
import Home from './components/dummies/home';
import React from 'react';
import Revolting from './components/dummies/revolting';
import TodoPage from './components/todos'
import Voting from './components/dummies/voting';
import {App} from './app';
import {IndexRoute, Router, Route} from 'react-router';
import {render} from 'react-dom';

render((
  <Router history={createBrowserHistory()}>
    <Route path='/' name='voting' component={App}>
      <IndexRoute component={Home} />
      <Route name='vote' path='vote' component={Voting} />
      <Route name='revolt' path='revolt' component={Revolting} />
      <Route name='todos' path='todos' component={TodoPage} />
    </Route>
  </Router>
), document.getElementById('root'))
