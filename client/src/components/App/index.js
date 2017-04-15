import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import AppHeader from '../AppHeader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.actions.renewSession();
  }

  render() {
    if (!this.props.sessionInitialized) {
      return null;
    }

    return (
      <div>
        <AppHeader actions={this.props.actions} isLoggedIn={this.props.isLoggedIn} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    renewSession: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  sessionInitialized: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default App;
