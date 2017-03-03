import React from 'react';
import { connect } from 'react-redux';
import UploadForm from './components/upload_form';
import { uploadFile } from './actions/upload';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <h4>Add file</h4>
        <div className='row'>
          <div className='col-xs-6 upload-form-wrapper'>
            <UploadForm handleSubmit={this.props.upload} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  files: state.items,
  isFetching: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  upload: (file) => dispatch(uploadFile(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
