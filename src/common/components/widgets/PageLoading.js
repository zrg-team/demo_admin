import React, { Component } from 'react'
import Lottie from '../../../libraries/Lottie'

class PageLoading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  show () {
    this.setState({
      isShow: true
    })
  }

  hide () {
    this.setState({
      isShow: false
    })
  }

  isVisible () {
    const { isShow } = this.state
    return isShow
  }

  componentWillMount () {
    PageLoading.instance = this
  }

  componentWillUnmount () {
    delete PageLoading.instance
  }

  render () {
    const { isShow } = this.state

    if (!isShow) {
      return null
    }

    return (
      <div className='loading-container'>
        <div className='loading-inner'>
          <Lottie
            options={{
              animationData: require('../../../assets/animations/loading_common.json')
            }}
            style={{
              marginBottom: 150
            }}
            width={120}
            height={120}
          />
        </div>
      </div>
    )
  }
}

export default {
  Component: PageLoading,
  show () {
    PageLoading.instance && PageLoading.instance.show()
  },
  hide () {
    PageLoading.instance && PageLoading.instance.hide()
  },
  isVisible () {
    return PageLoading.instance.isVisible()
  }
}
