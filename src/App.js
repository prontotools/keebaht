import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
// import Main from './Main'
import Billing from './Billing'
// import Amount from './Amount'
// import Summary from './Summary'
import { db } from './firebase'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" component={Main} /> */}
          <Route path="/billing" component={Billing} />
          {/* <Route path="/amount" component={Amount} /> */}
          {/* <Route path="/summary" component={Summary} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
