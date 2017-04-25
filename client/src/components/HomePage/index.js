import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import DatasetList from '../DatasetList';
import UploadDialog from '../UploadDialog';

class HomePage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { showUploadDialog: false };
    this.props.actions.getDatasets();
  }

  closeUploadDialog() {
    this.setState({ showUploadDialog: false });
  }

  openUploadDialog() {
    this.setState({ showUploadDialog: true });
  }

  render() {
    return (
      <div className='container'>
        <DatasetList
          datasets={this.props.datasets}
          actions={{ deleteDataset: this.props.actions.deleteDataset }}
        />

        <Button bsStyle='success' onClick={() => this.openUploadDialog()}>
          <Glyphicon glyph='plus' /> Add Dataset
        </Button>

        <UploadDialog
          show={this.state.showUploadDialog}
          close={() => this.closeUploadDialog()}
          handleSubmit={this.props.actions.uploadDataset}
          isUploading={this.props.isUploading}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.shape({
    getDatasets: PropTypes.func.isRequired,
    uploadDataset: PropTypes.func.isRequired,
    deleteDataset: PropTypes.func.isRequired,
  }).isRequired,
  datasets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    dsid: PropTypes.string,
  })).isRequired,
  isUploading: PropTypes.bool.isRequired,
};

export default HomePage;
