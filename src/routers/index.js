import React, { Component, lazy, Suspense } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import Loading from '@/components/loading'
import routers from './routers'
import history from './history'
// import { getSessionStorage } from '@/utils/commons'
import DocumentTitle from 'react-document-title'

// const NOT_FOUND = lazy(() => import('@/pages/exception/404'))

export default class RouteConfig extends Component {
  render() {
    const noAuthRoutes = routers.filter(item => {
      return !item.auth
    })
    const Layout = lazy(() => import('@/components/layout'))
    return (
      <Router history={history}>
        <Switch>
          {noAuthRoutes.map(item => {
            // 懒加载
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
                key={item.name}
                path={item.path}
                exact={item.exact}
                render={props => (
                  <Suspense fallback={<Loading />}>
                    <DocumentTitle title={item.title + ' - My React'}>
                      {<DynamicComponent {...props} />}
                    </DocumentTitle>
                  </Suspense>
                )}
              ></Route>
            )
          })}
          <Route
            path="/app"
            render={props => (
              <Suspense fallback={<Loading />}>
                {<Layout {...props} />}
              </Suspense>
            )}
          ></Route>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" push />} />
          <Redirect exact from="*" to="/notfound" />
          {/* {routers.map((item, index) => {
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
                    // 已登陆，并且路由指向login页，重定向到dashboard页
                    item.name === 'Login' &&  getSessionStorage('access_token') && getSessionStorage('refresh_token') && getSessionStorage('userInfo') ? 
                    (
                      <Redirect exact to='/dashboard' />
                    ) : 
                    (
                      <Suspense fallback={<Loading />}>
                        <DocumentTitle title={item.title + ' - My React'}>
                          {<DynamicComponent {...props} />}
                        </DocumentTitle>
                      </Suspense>
                    )
                  ) : 
                  (
                    getSessionStorage('access_token') && getSessionStorage('refresh_token') ?
                    (
                      <Suspense fallback={<Loading />}>
                        <DocumentTitle title={item.title + ' - My React'}>
                          {<DynamicComponent {...props} />}
                        </DocumentTitle>
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
          <Redirect exact from='*' to='/notfound' /> */}
        </Switch>
      </Router>
    )
  }
}
