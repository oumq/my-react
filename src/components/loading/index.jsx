import React, { Component } from 'react'
import { Spin } from 'antd'
import './loading.scss'

class Loading extends Component {
  render () {
    return (
      <div className='loading-container'>
        <Spin />
      </div>
    )
  }
}

export default Loading 