import { connect } from 'react-redux'
import UserList from '../components/UserList'
import handlers from '../handlers'
import { MODULE_NAME as MODULE_USER } from '../models'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  // TODO: Only map something usefull
  return {
    data: state[MODULE_USER].users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
