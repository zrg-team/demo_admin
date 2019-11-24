import React from 'react'
import Lottie from '../../../libraries/Lottie'

export default () => (
  <div className='loading-session-body'>
    <div className='loading'>
      <Lottie
        options={{
          animationData: require('../../../assets/animations/not_found.json')
        }}
        width={120}
        height={120}
      />
    </div>
  </div>
)
