import 'graphiql/graphiql.css';
import React from 'react';
import PropTypes from 'prop-types';
import GraphiQL from 'graphiql';
import './grok_page.css';
import { SERVER_URL } from '../../constants/server';

function graphQLFetcher(graphQLParams) {
  return fetch(`${SERVER_URL}/graphql`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
    credentials: 'include',
  }).then(response => response.json());
}

const GrokPage = () => (
  <div className='graphiql container'>
    <GraphiQL fetcher={graphQLFetcher} />
  </div>
);

GrokPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      dsid: PropTypes.string,
    }),
  }).isRequired,
};

export default GrokPage;
