import React from 'react'
import LoginForm from '../modules/user/containers/LoginForm'

export default class LoginPage extends React.Component {
  render () {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundImage: 'linear-gradient( 359.3deg,  rgba(196,214,252,1) 1%, rgba(187,187,187,0) 70.9% )'
        }}
      >
        <LoginForm />
      </div>
    )
  }
}
