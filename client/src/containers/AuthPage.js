import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import AuthForm from '../components/AuthForm';

function mapStateToProps(state) {
  return {
    isLoggedIn: (state.auth.user !== null),
    loginError: state.auth.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ login }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthForm);
