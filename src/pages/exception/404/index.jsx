import React, { Component } from 'react'
import { Result, Button } from 'antd';


class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    )
  }
}

export default NotFound 