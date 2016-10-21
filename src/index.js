import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import RoomList from './components/RoomList'
import Room from './components/Room'
// import Clients from './components/Clients'

render(
  <Router history ={browserHistory}>
    <Route path ='/' component ={Layout}>
      <IndexRoute component={RoomList}/>
      <Route path='/room/:id' component={Room}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
