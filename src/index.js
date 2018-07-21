import React from 'react'
import ReactDOM from 'react-dom'
//import App from './App'
import Billing from './Billing'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Billing />, document.getElementById('root'))
registerServiceWorker()
