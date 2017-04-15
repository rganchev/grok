import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UploadForm from '../components/UploadForm';
import uploadFile from '../actions/upload';

const HomePage = props => (
  <UploadForm handleSubmit={props.actions.uploadFile} />
);

HomePage.propTypes = {
  actions: PropTypes.shape({
    uploadFile: PropTypes.func.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ uploadFile }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(HomePage);
