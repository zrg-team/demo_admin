import React from 'react'
// import I18n from 'i18n-js'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_KEY } from '../../../configs'
import { Card, Form, Icon, Input, Button, Checkbox, notification } from 'antd'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recaptcha: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeCapcha = this.handleChangeCapcha.bind(this)
  }

  handleChangeCapcha (recaptcha) {
    this.setState({
      recaptcha
    })
  }

  handleSubmit (e) {
    const { recaptcha } = this.state
    const { form, login } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await login(values.username, values.password, recaptcha)
        if (result.success) {
          notification.success({
            message: 'Login Success',
            description:
              `Wellcome back ${result.user.user_name}`
          })
        } else {
          notification.error({
            message: result.msg
          })
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Card title='Login'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
            <ReCAPTCHA
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleChangeCapcha}
            />
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create({ name: 'normal_login' })(LoginForm)
