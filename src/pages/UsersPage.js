import React from 'react'
import UserList from '../modules/user/containers/UserList'

class UsersPage extends React.Component {
  render () {
    const { history } = this.props
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <UserList history={history} />
      </div>
    )
  }
}

export default UsersPage
