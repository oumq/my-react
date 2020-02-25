
// 如果没有子路由的情况，建议大家配都加一个exact；
// 如果有子路由，建议在子路由中加exact，父路由不加； 
// 而strict是针对是否有斜杠的，一般可以忽略不配置。
const routers = [
  {
    path: '/login',
    name: 'Login',
    component: 'login',
    exact: true,
    children: [],
    auth: false
  },
  {
    path: '/home',
    name: 'Home',
    component: 'home',
    exact: true,
    children: [],
    auth: true
  }
]

export default routers
