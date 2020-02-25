import * as userActionType from './action-type'
import API from '@/api/api'

// 保存用户信息
export const saveUser = (user) => {
  return {
    type: userActionType.SAVE_USER,
    user
  }
}

// 获取用户信息并保存
export const getUserInfo = params => {
  return async dispatch => {
    try {
      let result = await API.getUserInfo(params)
      dispatch({
        type: userActionType.SAVE_USER,
        user: result.data
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}