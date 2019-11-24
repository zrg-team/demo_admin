import React from 'react'
import UserForm from '../modules/user/containers/UserForm'

export default class CreateUserPage extends React.Component {
  render () {
    const { history } = this.props
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'scroll'
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: '0px auto',
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <UserForm history={history} />
        </div>
      </div>
    )
  }
}
