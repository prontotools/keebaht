import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

import Main from './Main'
import Billing from './Billing'
import Amount from './Amount'
import Summary from './Summary'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/billing" component={Billing} />
          <Route path="/amount" component={Amount} />
          <Route path="/summary" component={Summary} />
        </Switch>
      </Router>
    )
  }
}

export default App
