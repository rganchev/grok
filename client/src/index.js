import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import App from './containers/app';
import rootReducer from './reducers';
import { SERVER_URL } from './constants/server';

const networkInterface = createNetworkInterface({
  uri: `${SERVER_URL}/graphql`,
});

const client = new ApolloClient({ networkInterface });

const store = createStore(
  combineReducers({
    ...rootReducer,
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
    <App />
  </ApolloProvider>,
  document.getElementById('root'));
