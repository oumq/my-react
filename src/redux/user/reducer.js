import * as userActionType from './action-type'
import { getSessionStorage, setSessionStorage } from '@/utils/commons'

let userInfo = getSessionStorage('userInfo') ? JSON.parse(getSessionStorage('userInfo')) : ''

let defaultState = {
  account: userInfo.account ? userInfo.account : '',
  name: userInfo.name ? userInfo.name : '',
  password: userInfo.password ? userInfo.password : '',
  email: userInfo.email ? userInfo.email : '',
  phone: userInfo.phone ? userInfo.phone : ''
}

export const user = (state = defaultState, action = {}) => {
  switch (action.type) {
    case userActionType.SAVE_USER:
      setSessionStorage('userInfo', JSON.stringify({ ...state, ...action.user }))
      return { ...state, ...action.user }
    default:
      return state
  }
}
