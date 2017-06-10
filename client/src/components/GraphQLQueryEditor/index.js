import React from 'react';
import PropTypes from 'prop-types';
import GraphiQL from 'graphiql';
import './graphql_query_editor.css';
import { SERVER_URL } from '../../constants/server';

function graphQLFetcher(graphQLParams) {
  return fetch(`${SERVER_URL}/graphql`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
    credentials: 'include',
  }).then(response => response.json());
}

const defaultQuery = `query ($dsid: ID) {
  dataset(dsid: $dsid) {
    columns
  }
}`;

function getDefaultVariables(dsid) {
  return `{\n  "dsid": "${dsid}"\n}`;
}

const GraphQLQueryEditor = props => (
  <div className='graphiql container'>
    <GraphiQL
      fetcher={graphQLFetcher}
      query={defaultQuery}
      variables={getDefaultVariables(props.dsid)}
    />
  </div>
);

GraphQLQueryEditor.propTypes = {
  dsid: PropTypes.string.isRequired,
};

export default GraphQLQueryEditor;
