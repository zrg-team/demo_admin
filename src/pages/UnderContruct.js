import React from 'react'
// import I18n from 'i18n-js'
import Loading from '../common/components/widgets/Loading'

class UnderContruct extends React.Component {
  render () {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Loading />
      </div>
    )
  }
}

export default UnderContruct
