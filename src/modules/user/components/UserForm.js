import React from 'react'
import I18n from 'i18n-js'
import {
  Form,
  Icon,
  Input,
  Button,
  notification,
  Tooltip,
  Card,
  Select
} from 'antd'
import { validatePasswordLength, compareToFirstPassword } from '../../../common/utils/validator'

class UserForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    this.validateToNextPassword = this.validateToNextPassword.bind(this)
  }

  handleSubmit (e) {
    const { form, createUser, history } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await createUser(values)
        if (result.success) {
          history.push('/')
          notification.success({
            message: `${I18n.t('user.user')}`,
            description:
            `${I18n.t('common.created')}`
          })
        } else {
          if (result && result.errors) {
            result.errors.forEach(error => {
              if (!error || !error.field) {
                return
              }
              form.setFields({
                [error.field]: {
                  value: error.value,
                  errors: [new Error(error.message)]
                }
              })
            })
          }
          notification.error({
            message: result.msg
          })
        }
      }
    })
  }

  validateToNextPassword (rule, value, next) {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFieldsAndScroll(['confirm'], { force: true })
    }
    next()
  }

  compareToFirstPassword (rule, value, next) {
    const form = this.props.form
    return compareToFirstPassword(rule, value, next, form)
  }

  handleSelectChange (value) {
  }

  handleConfirmBlur (e) {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Card
          size='small'
        >
          <Form.Item
            label={
              <span>
                {I18n.t('user.username')}&nbsp;
                <Tooltip title={I18n.t('errors.username_must_be_unique')}>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: `${I18n.t('errors.username_required')}`, whitespace: true }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label={I18n.t('user.password')} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: `${I18n.t('errors.password_required')}`
                },
                {
                  validator: this.validateToNextPassword
                },
                {
                  validator: validatePasswordLength
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={I18n.t('user.confirm_password')} hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: `${I18n.t('errors.confirm_your_password_required')}`
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label={I18n.t('user.user_type')}>
            {getFieldDecorator('user_type_id', {
              rules: [{ required: true, message: `${I18n.t('errors.user_type_required')}` }]
            })(
              <Select
                placeholder={I18n.t('common.select_a_option')}
                onChange={this.handleSelectChange}
              >
                {[{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }, { id: 3, name: 'Customer' }].map(item => {
                  return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
              </Select>
            )}
          </Form.Item>
        </Card>
        <Card
          size='small'
          style={{ marginTop: 10, marginBottom: 10, alignItems: 'center', display: 'flex', justifyContent: 'center' }}
        >
          <Button size='large' type='primary' htmlType='submit'>
            {I18n.t('common.register')}
            <Icon type='right' />
          </Button>
        </Card>
      </Form>
    )
  }
}

export default Form.create({ name: 'normal_login' })(UserForm)
