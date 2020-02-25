import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveUser } from '@/redux/user/action'
import '@/style/login.scss'
import { initCanvas } from '@/utils/canvasMoveEffect'
import { Form, Icon, Input, Button } from 'antd'
import API from '@/api/api'
import history from '@/routers/history'
import { setSessionStorage } from '@/utils/commons'

@connect(
  state => ({}),
  { saveUser }
)
class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginLoading: false
    }
  }

  componentDidMount () {
    console.log('Component DID MOUNT!')
    initCanvas(this.refs.bg)
    window.addEventListener('resize', function () {
      initCanvas(this.refs.bg)
    }.bind(this))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res = await API.login(values)
        if (res.code === 200) {
          // 保存用户信息
          this.props.saveUser(res.data.userInfo)
          // 保存token
          setSessionStorage('access_token', res.data.access_token)
          setSessionStorage('refresh_token', res.data.refresh_token)
          history.push('/home')
        } else {
          this.setState({
            loginLoading: false
          })
        }
      }
    })
  }

  loginLoadingState = () => {
    this.setState({
      loginLoading: true
    })
  }


  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login-container'>
        <div className='background' ref='bg'>
          <canvas></canvas>
          <canvas></canvas>
          <canvas></canvas>
        </div>
        <div className='title'>
          React Demo
        </div>
        <div className='main'>
          <div className='form-container'>
            <span className='form-title'>Login In</span>
            <Form onSubmit={this.handleSubmit} className='antdForm'>
              <Form.Item>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: 'Please input your account!' }]
                })(
                  <div className='form-input'>
                    <Icon type='user' style={{ fontSize: '1.2vw', color: '#f7296f' }} />
                    <span>Account</span>
                    <Input placeholder='Account' size='large' />
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }]
                })(
                  <div className='form-input'>
                    <Icon type='unlock' style={{ fontSize: '1.2vw', color: '#f7296f' }} />
                    <span>Password</span>
                    <Input type='password' placeholder='Password' size='large' />
                  </div>
                )}
              </Form.Item>
              <div className='form-text-forgot'>
                <a href='/#'>Forgot Password ?</a>
              </div>
              <Button onClick={this.loginLoadingState} loading={this.state.loginLoading} htmlType='submit' size='large' block>
                Log In
              </Button>
              <div className='form-text-register'>
                Don’t have an Account ? <a href='/#'>Register</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(login);

export default WrappedLoginForm