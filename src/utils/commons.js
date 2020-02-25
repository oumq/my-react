/**
 * 格式化参数，用于get请求
 * @param {*} data
 */
export const paramsFormat = data => {
  let dataList = []
  let paramsStr = ''
  Object.keys(data).forEach(key => {
    dataList.push(key + '=' + data[key])
  })
  if (dataList.length > 0) {
    paramsStr = dataList.join('&')
  }
  return paramsStr
}

/**
 * 设置sessionStorage
 * @param {*} key
 * @param {*} value
 */
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value)
}

/**
 * 获取sessionStorage值
 * @param {*} key
 */
export const getSessionStorage = key => {
  return sessionStorage.getItem(key)
}

/**
 * 删除sessionStorage值
 * @param {*} key
 */
export const removeSessionStorage = key => {
  sessionStorage.removeItem(key)
}

/**
 * 设置localStorage
 * @param {*} key
 * @param {*} value
 */
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

/**
 * 获取localStorage值
 * @param {*} key
 */
export const getLocalStorage = key => {
  return localStorage.getItem(key)
}

/**
 * 删除localStorage值
 * @param {*} key
 */
export const removeLocalStorage = key => {
  localStorage.removeItem(key)
}

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 * @param {*} immediate
 */
export const Debounce = (fn, delay = 300, immediate = false) => {
  let timer = null // 闭包存储setTimeout状态
  return function() {
    let self = this // 事件源this
    let args = arguments // 接收事件源的event
    if (timer) clearTimeout(timer) // 存在就清除执行fn的定时器
    if (immediate) {
      // 立即执行
      let callNow = !timer // 执行fn的状态
      timer = setTimeout(function() {
        timer = null
      }, delay)
      if (callNow) fn.apply(self, args)
    } else {
      // 非立即执行
      timer = setTimeout(function() {
        // 或者使用箭头函数将this指向dom
        fn.apply(self, args)
      }, delay)
    }
  }
}

/**
 * 节流函数
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
export const Throttle = (fn, delay = 500, immediate = false) => {
  let preTime = 0 // 记录上一次执行时间
  return function() {
    let self = this, // 保留执行时候的的this
      args = [...arguments], // 执行时候的传入参数
      nowTime = +new Date(), // 记录当前的时间
      flag = nowTime - preTime >= delay // 执行命令
    if (immediate) {
      // 是否立即执行
      if (!flag) return
      preTime = nowTime // 更新执行时间
      fn.apply(self, args)
    } else {
      if (!flag) return // 不满足执行条件
      preTime = nowTime
      setTimeout(function() {
        fn.apply(self, args)
      }, delay)
    }
  }
}
