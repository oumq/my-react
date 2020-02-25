import React, { Component, lazy, Suspense } from 'react'
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Loading from '@/components/loading'
import routers from './routers'
import history from './history'
import { getSessionStorage } from '@/utils/commons'

const Error = lazy(() => import('@/pages/error'))

export default class RouteConfig extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {routers.map((item, index) => {
            const DynamicComponent = lazy(() => {
              return new Promise(resolve => {
                setTimeout(
                  () => resolve(import(`@/pages/${item.component}`)),
                  300
                )
              })
            })
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                render={props => (
                  // 判断是否需要权限校验，
                  !item.auth ? 
                  (
                    // 已登陆，并且路由指向login页，重定向到home页
                    item.name === 'Login' &&  getSessionStorage('access_token') && getSessionStorage('refresh_token') && getSessionStorage('userInfo') ? 
                    (
                      <Redirect exact to='/home' />
                    ) : 
                    (
                      <Suspense fallback={<Loading />}>
                        {<DynamicComponent {...props} />}
                      </Suspense>
                    )
                  ) : 
                  (
                    getSessionStorage('access_token') && getSessionStorage('refresh_token') ?
                    (
                      <Suspense fallback={<Loading />}>
                        {<DynamicComponent {...props} />}
                      </Suspense>
                    ) :
                    (
                      <Redirect exact to='/login' />
                    )
                  )
                )}
              ></Route>
            )
          })}
          <Redirect exact from='/' to='/login' />
          <Suspense fallback={<div></div>}>
            <Route path='*' component={Error} />
          </Suspense>
        </Switch>
      </Router>
    )
  }
}
