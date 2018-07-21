import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
// import Main from './Main'
// import Billing from './Billing'
// import Amount from './Amount'
// import Summary from './Summary'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" component={Main} /> */}
          {/* <Route path="/Billing" component={Billing} /> */}
          {/* <Route path="/Amount" component={Amount} /> */}
          {/* <Route path="/Summary" component={Summary} /> */}

        </Switch>
      </BrowserRouter>
    )
  }
}
export default App
