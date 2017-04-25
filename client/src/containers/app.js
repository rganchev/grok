import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renewSession, logout } from '../actions/auth';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    sessionInitialized: state.auth.sessionInitialized,
    username: state.auth.user && state.auth.user.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ renewSession, logout }, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
