import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

function createPrivateComponent(component, isLoggedIn) {
  const privateComponent = props => (
    isLoggedIn ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  );

  privateComponent.propTypes = {
    location: PropTypes.string.isRequired,
  };

  return privateComponent;
}

const PrivateRoute = (routeProps) => {
  const { component, ...rest } = routeProps;
  return (<Route
    {...rest}
    render={createPrivateComponent(component, routeProps.isLoggedIn)}
  />);
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { isLoggedIn: (state.auth.user !== null) };
}

export default connect(
  mapStateToProps,
)(PrivateRoute);
