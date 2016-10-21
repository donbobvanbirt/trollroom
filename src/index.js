import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import RoomList from './components/RoomList'
// import Clients from './components/Clients'

render(
  <Router history ={browserHistory}>
    <Route path ='/' component ={Layout}>
      <IndexRoute component={RoomList}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
