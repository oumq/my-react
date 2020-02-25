import { get, post } from './server'
import {paramsFormat} from '@/utils/commons'

class Api {

  /**
   * 登录接口
   * @param {*} params 
   */
  async login (params) {
    try {
      let result = await post('/api/login', params)
      if (result && result.data) {
        return result.data
      }
    } catch (error) {
      console.error('api.js : ' + error)
      throw error
    }
  }

  /**
   * 获取用户信息
   * @param {*} params 
   */
  async getUserInfo (params) {
    try {
      let result = await get('/api/getUserInfo/' + params)
      if (result && result.data) {
        return result.data
      }
    } catch (error) {
      console.error('api.js : ' + error)
      throw error
    }
  }


  /**
   * 获取天气接口
   * @param {*} params 
   */
  async getWeather(params) {
    try {
      let result = await get('/weather/common?' + paramsFormat(params))
      if (result && result.data) {
        return result.data
      }
    } catch (error) {
      console.error('api.js : ' + error)
      throw error
    }
  }
}

export default new Api()
