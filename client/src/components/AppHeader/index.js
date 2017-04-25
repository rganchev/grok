import React from 'react';
import PropTypes from 'prop-types';
import './app_header.css';

const AppHeader = props => (
  <div className='app-header navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a href='#' className='logo navbar-left'>
          <img src='../../assets/grok_logo.png' alt='GROK' />
        </a>
      </div>
      { props.username ?
        <ul className='nav navbar-nav navbar-right'>
          <li className='navbar-text'>
            Hello, {props.username}!
          </li>
          <li>
            <a href='#' className='navbar-link' onClick={props.actions.logout}>Sign out</a>
          </li>
        </ul>
        : null
      }
    </div>
  </div>
);

AppHeader.propTypes = {
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string,
};

AppHeader.defaultProps = {
  username: 'Guest',
};

export default AppHeader;
