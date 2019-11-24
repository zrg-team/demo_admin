import { connect } from 'react-redux'
import UserForm from '../components/UserForm'
import handlers from '../handlers'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  // TODO: Only map something usefull
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
