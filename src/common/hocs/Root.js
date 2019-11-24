import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Button, notification } from 'antd'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { unregister } from '../../serviceWorker'
import MainPage from './MainPage'

export default class Root extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  async componentDidMount () {
    try {
      // TODO: Repare something
      window.addEventListener('newContentAvailable', () => {
        const key = `open${Date.now()}`
        const btn = (
          <Button
            type='primary' size='small' onClick={() => {
              unregister(() => {
                notification.close()
                setTimeout(() => {
                  window.location.reload(window.location.href)
                }, 5000)
              })
            }}
          >
            RELOAD
          </Button>
        )
        notification.open({
          duration: 5 * 60 * 1000,
          message: 'Notification',
          description:
            'New version available.',
          btn,
          key
        })
      })
    } catch (error) {
      console.error('Fatal Error. Cannot Initialize.', error)
    }
  }

  render () {
    const { store, persistor, history } = this.props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainPage
            store={store}
            history={history}
            persistor={persistor}
          />
        </PersistGate>
      </Provider>
    )
  }
}
