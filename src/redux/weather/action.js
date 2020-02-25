import * as weatherActionType from './action-type'
import API from '@/api/api'

export const setWeather = weather => {
  return {
    type: weatherActionType.SET_WEATHER,
    weather
  }
}

export const getWeatherFromApi = params => {
  return async dispatch => {
    try {
      let result = await API.getWeather(params)
      dispatch({
        type: weatherActionType.SET_WEATHER,
        weather: {
          degree: result.data.forecast_1h[0].degree,
          weather: result.data.forecast_1h[0].weather,
          windDirection: result.data.forecast_1h[0].wind_direction,
          windPower: result.data.forecast_1h[0].wind_power
        }
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
