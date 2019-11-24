import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Routes from '../routes'
import Modal from '../components/widgets/Modal'
import PageLoading from '../components/widgets/PageLoading'
import ProgressLoading from '../components/widgets/ProgressLoading'
import Loading from '../components/widgets/Loading'
import userHandlers from '../../modules/user/handlers'

class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  async componentDidMount () {
    const { user, getUser } = this.props
    if (user && user.id) {
      try {
        await getUser(user.id)
        this.setState({
          loading: false
        }, () => {
          this.forceUpdate()
        })
      } catch (err) {
      }
    }
  }

  shouldComponentUpdate (nextProps) {
    const { user } = this.props
    if ((!user && nextProps.user) || (nextProps.user && user.id !== nextProps.user.id)) {
      return true
    }
    return false
  }

  render () {
    const { loading } = this.state
    const { store } = this.props
    if (loading) {
      return <Loading />
    }
    return (
      <>
        <HashRouter>
          <Routes store={store} />
        </HashRouter>
        <ProgressLoading.Component />
        <PageLoading.Component type='bars' />
        <Modal.Component global />
      </>
    )
  }
}

export default connect(
  (state) => {
    return {
      user: state.user.user
    }
  }, (dispatch) => ({
    dispatch,
    ...userHandlers(dispatch)
  })
)(MainPage)
