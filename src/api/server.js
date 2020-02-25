import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setSessionStorage, getSessionStorage, removeSessionStorage } from '@/utils/commons'
import history from '@/routers/history'

axios.defaults.baseURL = '/'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    console.error('server.js : ' + error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    // token 处于活动状态刷新
    if (response.headers.access_token || response.headers.refresh_token) {
      setSessionStorage('access_token', response.headers.access_token)
      setSessionStorage('refresh_token', response.headers.refresh_token)
    }
    if (response.data) {
      let code = response.data.code
      if (code === 401 || code === 402 || code === 403) { // token 异常
        removeSessionStorage('userInfo')
        removeSessionStorage('access_token')
        removeSessionStorage('refresh_token')
        history.push('/login')
        return Promise.reject('token 异常')
      } else {
        return response
      }
    }
  },
  error => {
    NProgress.done()
    console.error('server.js : ' + error)
    return Promise.reject(error)
  }
)

export const post = (url, params = {}, options = {}) => {
  return axios({
    ...{
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'access_token': getSessionStorage('access_token') === null ? '' : getSessionStorage('access_token'),
        'refresh_token': getSessionStorage('refresh_token') === null ? '' : getSessionStorage('refresh_token')
      }
    },
    ...options
  })
}

export const get = (url, options = {}) => {
  return axios({
    ...{
      method: 'get',
      url: url,
      headers: {
        'charset': 'utf-8',
        'access_token': getSessionStorage('access_token') === null ? '' : getSessionStorage('access_token'),
        'refresh_token': getSessionStorage('refresh_token') === null ? '' : getSessionStorage('refresh_token')
      }
    },
    ...options
  })
}

export const multiple = function(requsetArray, callback) {
  axios.call(requsetArray).then(axios.spread(callback))
}
