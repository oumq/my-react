import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWeatherFromApi } from '@/redux/weather/action'
import { getUserInfo } from '@/redux/user/action'

@connect(
  state => (
    {
      weather: state.weather,
      user: state.user
    }
  ),
  {
    getWeatherFromApi,
    getUserInfo
  }
)
class home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.log('Component DID MOUNT!')
  }

  getWeather () {
    let params = {
      'source': 'xw',
      'weather_type': 'forecast_1h|forecast_24h|index|alarm|limit|tips',
      'province': '福建',
      'city': '厦门',
      'county': '思明区'
    }
    this.props.getWeatherFromApi(params)
  }

  getUserInfo (params) {
    console.log(params)
    this.props.getUserInfo(params)
  }

  render () {

    return (
      <div>
        {this.props.weather.degree !== '' ? <div>温度: {this.props.weather.degree}℃</div> : ''}
        {this.props.weather.weather !== '' ? <div>天气: {this.props.weather.weather}</div> : ''}
        {this.props.weather.windDirection !== '' ? <div>风向: {this.props.weather.windDirection}</div> : ''}
        {this.props.weather.windPower !== '' ? <div>风力: {this.props.weather.windPower}级</div> : ''}
        <button onClick={this.getWeather.bind(this)}>获取天气</button>
        <button onClick={() => this.getUserInfo('oumq')}>获取用户信息</button>
        {this.props.user.account !== '' ? <div>account: {this.props.user.account}</div> : ''}
        {this.props.user.name !== '' ? <div>name: {this.props.user.name}</div> : ''}
        {this.props.user.password !== '' ? <div>password: {this.props.user.password}</div> : ''}
        {this.props.user.email !== '' ? <div>email: {this.props.user.email}</div> : ''}
        {this.props.user.phone !== '' ? <div>phone: {this.props.user.phone}</div> : ''}
      </div>
    )
  }
}

export default home