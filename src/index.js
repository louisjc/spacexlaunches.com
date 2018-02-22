import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import './index.css'
import App from './App'

ReactGA.initialize('UA-77842893-1')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(<App />, document.getElementById('root'))
