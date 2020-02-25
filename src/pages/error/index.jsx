import React, { Component } from 'react'
import '@/style/error.scss'


class error extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='error-container'>
        404
      </div>
    )
  }
}

export default error 