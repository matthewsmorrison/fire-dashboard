import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { GlobalStyle } from './style'
import RedirectHandler from 'components/redirectHandler'
import { Router } from 'react-router'
import { history } from 'helpers/history'
import { Provider } from 'react-redux'
import store from 'store'

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <RedirectHandler />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
