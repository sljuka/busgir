import createBrowserHistory from 'history/lib/createBrowserHistory'
import Home from './features/voting/home'
import React from 'react'
import Revolting from './features/voting/revolting'
import TodoPage from './features/todos'
import Voting from './features/voting/voting'
import {App} from './app'
import {IndexRoute, Router, Route} from 'react-router'
import {render} from 'react-dom'

render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Voting} />
      <Route name='revolt' path='revolt' component={Revolting} />
      <Route name='todos' path='todos' component={TodoPage} />
      <Route name='counter' path='counter' component={Home} />
    </Route>
  </Router>
), document.getElementById('root'))
