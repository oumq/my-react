// 如果没有子路由的情况，建议大家配都加一个exact；
// 如果有子路由，建议在子路由中加exact，父路由不加；
// 而strict是针对是否有斜杠的，一般可以忽略不配置。
const routers = [
  {
    path: '/login',
    name: 'login',
    title: '登陆',
    component: 'login',
    icon: 'mail',
    exact: true,
    auth: false,
    children: []
  },
  {
    path: '/app/dashboard',
    name: 'dashboard',
    title: '仪表盘',
    component: 'dashboard',
    icon: 'setting',
    exact: true,
    auth: true,
    children: []
  },
  {
    path: '/app/base',
    name: 'base',
    title: '基础组件',
    icon: 'setting',
    exact: true,
    auth: true,
    children: [
      {
        path: '/app/icon',
        name: 'icon',
        title: '图标',
        component: 'icon',
        icon: 'setting',
        exact: true,
        auth: true,
      },
      {
        path: '/app/table',
        name: 'table',
        title: '表格',
        component: 'table',
        icon: 'setting',
        exact: true,
        auth: true,
      }
    ]
  },
  {
    path: '/notfound',
    name: 'notfound',
    title: '404',
    component: 'exception/404',
    icon: 'mail',
    exact: true,
    auth: false,
    children: []
  }
]

export default routers
