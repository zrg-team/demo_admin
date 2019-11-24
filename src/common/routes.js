import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import MainLayout from './hocs/MainLayout'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/LoginPage'
import UsersPage from '../pages/UsersPage'
import CreateUserPage from '../pages/CreateUserPage'

export default class Root extends Component {
  render () {
    const { store } = this.props
    const { user } = store.getState()
    if (!user.user || !user.user.id) {
      return (
        <>
          <Switch>
            <Route key='' path='/' exact component={LoginPage} />,
            <Route component={NotFoundPage} />
          </Switch>
        </>)
    }
    return (
      <MainLayout mode='1'>
        <Switch>
          <Route path='/' exact component={UsersPage} />
          <Route path='/user' exact component={UsersPage} />
          <Route path='/create-user' exact component={CreateUserPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MainLayout>
    )
  }
}
