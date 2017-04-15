import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './auth_form.css';

class AuthForm extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    this.props.actions.login(email, password);
  }

  render() {
    const loc = this.props.location;
    const from = (loc && loc.state && loc.state.from) || { pathname: '/' };

    if (this.props.isLoggedIn) {
      return (<Redirect to={from} />);
    }

    return (
      <div className='container'>
        <form className='auth-form' onSubmit={e => this.onSubmit(e)}>
          <h2>Please sign in</h2>
          <input
            type='email'
            className='form-control'
            ref={(input) => { this.emailInput = input; }}
          />
          <input
            type='password'
            className='form-control'
            ref={(input) => { this.passwordInput = input; }}
          />
          <div className='checkbox'>
            <label htmlFor='remember-me-checkbox'>
              <input
                type='checkbox'
                id='remember-me-checkbox'
                ref={(cb) => { this.rememberMeCheckbox = cb; }}
              />
              Remember me
            </label>
          </div>
          <button
            className='btn btn-lg btn-primary btn-block'
            type='submit'
          >
            Sign in
          </button>
          { this.props.loginError ?
            <div className='alert alert-danger'>Invalid credentials!</div>
            : null
          }
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AuthForm;
