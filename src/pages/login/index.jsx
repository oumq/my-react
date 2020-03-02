import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveUser } from '@/redux/user/action'
import './login.scss'
import { initCanvas } from '@/utils/canvasMoveEffect'
import { Form, Icon, Input, Button, message } from 'antd'
// import API from '@/api/api'
import history from '@/routers/history'
// import { setSessionStorage } from '@/utils/commons'

@connect(
  state => ({}),
  { saveUser }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginLoading: false
    }
  }

  componentDidMount () {
    initCanvas(this.refs.bg)
    window.addEventListener('resize', function () {
      initCanvas(this.refs.bg)
    }.bind(this))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loginLoading: true
        })
        if (values.account === 'admin' && values.password === '123456') {
          history.push('/dashboard')
        } else {
          message.error('账号密码错误，请重新输入！acc/pwd: admin/123456')
        }
        this.setState({
          loginLoading: false
        })
        // let res = await API.login(values).catch(err => {
        //   this.setState({
        //     loginLoading: false
        //   })
        //   message.error('系统异常，请联系管理员！')
        // })
        // if (res && res.code === 200) {
        //   // 保存用户信息
        //   this.props.saveUser(res.data.userInfo)
        //   // 保存token
        //   setSessionStorage('access_token', res.data.access_token)
        //   setSessionStorage('refresh_token', res.data.refresh_token)
        //   history.push('/')
        // } else {
        //   this.setState({
        //     loginLoading: false
        //   })
        // }
      }
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
              <Button loading={this.state.loginLoading} htmlType='submit' size='large' block>
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

const WrappedLoginForm = Form.create({ name: 'login' })(Login)

export default WrappedLoginForm