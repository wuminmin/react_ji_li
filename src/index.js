import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import MyLogin from './MyLogin'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={MyLogin} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))