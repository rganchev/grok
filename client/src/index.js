import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import reducers from './reducers';
import { SERVER_URL } from './constants/server';
import routes from './routes';

const networkInterface = createNetworkInterface({
  uri: `${SERVER_URL}/graphql`,
  opts: {
    credentials: 'include',
  },
});

const client = new ApolloClient({ networkInterface });

const store = createStore(
  combineReducers({
    ...reducers,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger())),
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>{routes}</Router>
  </ApolloProvider>,
  document.getElementById('root'));
