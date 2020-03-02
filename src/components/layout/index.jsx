import React, { Component, lazy, Suspense } from 'react'
import { Layout, Menu, Icon } from 'antd'
import './layout.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import routers from '@/routers/routers'
import DocumentTitle from 'react-document-title'
import Loading from '@/components/loading'
import history from '@/routers/history'
import 'animate.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class LayoutCustom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  menuClick = (item, key, keyPath, domEvent) => {
    console.log(item, key, keyPath, domEvent)
    history.push(item.key)
  }

  render () {
    const { Header, Sider, Content, Footer } = Layout
    const { SubMenu } = Menu
    const authRoutes = routers.filter(item => {
      return item.auth
    })
    return (
      <Layout className='layout-container'>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className='logo' />
          <Menu theme='dark' mode='inline' onClick={this.menuClick}>
            {
              authRoutes.map(i => {
                if (i.children.length > 0) {
                  return (
                    <SubMenu
                      key={i.name}
                      title={
                        <span>
                          <Icon type={i.icon} />
                          <span>{i.title}</span>
                        </span>
                      }>
                      {
                        i.children.map(j => {
                          return (
                            <Menu.Item key={j.name}>
                              <Icon type={j.icon} />
                              <span>{j.title}</span>
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                } else {
                  return (
                    <Menu.Item key={i.name}>
                      <Icon type={i.icon} />
                      <span>{i.title}</span>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px 0 16px',
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              {
                authRoutes.map(i => {
                  if (i.children.length > 0) {
                    return (
                      i.children.map(j => {
                        const DynamicComponent = lazy(() => {
                          return new Promise(resolve => {
                            setTimeout(
                              () => resolve(import(`@/pages/${j.component}`)),
                              300
                            )
                          })
                        })
                        return (
                          <Route
                            key={j.name}
                            path={j.path}
                            exact={j.exact}
                            render={props => (
                              <Suspense fallback={<Loading />}>
                                <DocumentTitle title={j.title + ' - My React'}>
                                  <ReactCSSTransitionGroup
                                    transitionEnter={true}
                                    transitionName='animated'>
                                    {<DynamicComponent {...props} />}
                                  </ReactCSSTransitionGroup>
                                </DocumentTitle>
                              </Suspense>
                            )}>
                          </Route>
                        )
                      })
                    )
                  } else {
                    const DynamicComponent = lazy(() => {
                      return new Promise(resolve => {
                        setTimeout(
                          () => resolve(import(`@/pages/${i.component}`)),
                          300
                        )
                      })
                    })
                    return (
                      <Route
                        key={i.name}
                        path={i.path}
                        exact={i.exact}
                        render={props => (
                          <Suspense fallback={<Loading />}>
                            <DocumentTitle title={i.title + ' - My React'}>
                              <ReactCSSTransitionGroup
                                transitionEnter={true}
                                transitionName='animated'>
                                {<DynamicComponent {...props} />}
                              </ReactCSSTransitionGroup>
                            </DocumentTitle>
                          </Suspense>
                        )}>
                      </Route>
                    )
                  }
                })
              }
              <Redirect exact from='*' to='/notfound' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '12px 50px' }}>oumq</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutCustom