import 'graphiql/graphiql.css';
import React from 'react';
import PropTypes from 'prop-types';
import GraphQLQueryEditor from '../GraphQLQueryEditor';
import './grok_page.css';

const GrokPage = props => (
  <GraphQLQueryEditor dsid={props.match.params.dsid} />
);

GrokPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      dsid: PropTypes.string,
    }),
  }).isRequired,
};

export default GrokPage;
