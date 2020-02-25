import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import './config/rem'
import Route from './routers'
import { Provider } from 'react-redux'
import store from './redux'
import { AppContainer } from 'react-hot-loader'
import * as serviceWorker from './serviceWorker'

const render = Component => {
  ReactDOM.render(
    // 绑定redux、热加载
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(Route)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routers/', () => {
    render(Route)
  })
}

serviceWorker.unregister()
