import React from 'react'
import 'antd/dist/antd.min.css'
import ReactDOM from 'react-dom'
import './common/styles/app.css'
import './common/styles/customize-ant.css'
import './common/styles/transition.css'
import './common/styles/responsive-admin.css'
import Root from './common/hocs/Root'
import store, { history } from './common/store'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Root {...store} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
