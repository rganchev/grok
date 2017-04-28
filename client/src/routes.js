import React from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './containers/PrivateRoute';
import App from './containers/App';
import AuthPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import GrokPage from './containers/GrokPage';

export default (
  <App>
    <Switch>
      <Route path='/login' component={AuthPage} />
      <PrivateRoute exact path='/' component={HomePage} />
      <PrivateRoute exact path='/grok/:dsid' component={GrokPage} />
    </Switch>
  </App>
);
