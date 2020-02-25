import * as weatherActionType from './action-type'

let defaultState = {
  degree: '',
  weather: '',
  windDirection: '',
  windPower: ''
}

export const weather = (state = defaultState, action = {}) => {
  switch (action.type) {
    case weatherActionType.SET_WEATHER:
      return { ...state, ...action.weather }
    default:
      return state
  }
}