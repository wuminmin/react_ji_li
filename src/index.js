import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import MyLogin from './MyLogin'
import WenZhang from './WenZhang'
import MyNews from './MyNews'
import DuiXian from './DuiXian'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={MyLogin} />
      <Route exact path="/wenzhang" component={WenZhang} />
      <Route exact path="/mynews" component={MyNews} />
      <Route exact path="/duixian" component={DuiXian} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))